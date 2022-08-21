import * as stream from 'stream';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { Inject, Service } from 'typedi';
import Web3 from 'web3';
import axios from 'axios';
import pLimit from 'p-limit';
import nftAbi from '@src/abis/nft_abi';
import Nft from '@src/models/nft';

const rpc = {
  // eth: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  eth: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  axl: 'https://axelartest-rpc.quickapi.com/',
  bnb: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  ftm: 'https://rpc.testnet.fantom.network/',
  aurora: 'https://testnet.aurora.dev',
  glmr: 'https://rpc.api.moonbase.moonbeam.network',
  matic: 'https://rpc-mumbai.matic.today',
};

interface TokenData {
  name: string;
  image: string;
  description: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

@Service()
export default class NftService {
  constructor(
    @Inject('models.nft') private nftModel: typeof Nft,
    private finished = promisify(stream.finished),
    private limit = pLimit(100),
    private smallLimit = pLimit(20),
  ) {}

  private randHex = (bytes: number) =>
    [...Array(bytes)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');

  public getPublicNfts = async (chain: keyof typeof rpc) => {
    const tokenURIs =
      chain === 'axl' ? [] : await this.getTokenUrisWeb3Base(chain);
    console.log(tokenURIs);
    const tokenData = await Promise.all(
      tokenURIs.map(async ([tokenURI, owner]) => ({
        ...(await this.getTokenUriInformation(tokenURI)),
        owner,
      })),
    );
    console.log(tokenData);
    const nfts = tokenData.filter((datum) => !datum.image.includes('ipfs://'));
    let done = 0;
    const images = await Promise.all(
      nfts.map(({ image }) =>
        this.smallLimit(async () => {
          const extension = image.split('.').pop();
          const imageName = `${this.randHex(32)}.${extension}`;
          const writer = fs.createWriteStream(
            path.join(__dirname, '../../', `./files/${imageName}`),
          );
          const imageResponse = await axios.get(image, {
            responseType: 'stream',
          });
          imageResponse.data.pipe(writer);
          await this.finished(writer);
          done += 1;
          console.log(done);
          return imageName;
        }),
      ),
    );
    this.nftModel.insertMany(
      nfts.map((nft, index) => ({
        contractAddress: '0x050cd8082b86c5f469e0ba72ef4400e5e454886d',
        name: nft.name,
        description: nft.description,
        properties: nft.attributes,
        imageFileName: images[index],
        owner: nft.owner,
      })),
    );
    return nfts;
  };

  private getTokenUrisWeb3Base = async (chain: keyof typeof rpc) => {
    const rpcUrl = rpc[chain];
    const web3 = new Web3(
      new Web3.providers.HttpProvider(rpcUrl, { timeout: 10e3 }),
    );
    const addr = '0x050cd8082b86c5f469e0ba72ef4400e5e454886d';
    const cont = new web3.eth.Contract(nftAbi, addr);
    const tokenAmount = await cont.methods.totalSupply().call();
    console.log(tokenAmount);
    let done = 0;
    const tokenUris = await Promise.all(
      Array.from({ length: tokenAmount }, async (_, i) =>
        this.limit(async () => {
          const tokenId = await cont.methods.tokenByIndex(i).call();
          const result = await cont.methods.tokenURI(tokenId).call();
          const owner = await cont.methods.ownerOf(tokenId).call();
          done += 1;
          console.log(done);
          return [result, owner] as const;
        }),
      ),
    );
    return tokenUris;
  };

  private getTokenUriInformation = async (uri: string) => {
    const data = await axios.get<TokenData>(uri);
    return data.data;
  };

  public getRandomNfts = async (size: number) => {
    const nfts = await this.nftModel.aggregate([{ $sample: { size } }]);
    return nfts;
  };
}
