import { Service } from 'typedi';
import Web3 from 'web3';
import net from 'net';
import nftAbi from '@src/abis/nft_abi';
import axios from 'axios';

const rpc = {
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
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

@Service()
export default class NftService {
  constructor() {}

  public getPublicNfts = async (chain: keyof typeof rpc) => {
    const tokenURIs =
      chain === 'axl' ? [] : await this.getTokenUrisWeb3Base(chain);
    console.log(tokenURIs);
    const tokenData = await Promise.all(
      tokenURIs.map(this.getTokenUriInformation),
    );
    console.log(tokenData);
    const nfts = tokenData.filter((datum) => !datum.image.includes('ipfs://'));
    return nfts;
  };

  private getTokenUrisWeb3Base = async (chain: keyof typeof rpc) => {
    const rpcUrl = rpc[chain];
    const web3 = new Web3(
      new Web3.providers.HttpProvider(rpcUrl, { timeout: 10e3 }),
    );
    const addr = '0x050cd8082b86c5f469e0ba72ef4400e5e454886d';
    const addr2 = '0xc01d2f3df268659cdaafefebdc8ad11bf93c5c47';
    const cont = new web3.eth.Contract(nftAbi, addr);
    const tokenAmount = await cont.methods.totalSupply().call();
    console.log(tokenAmount);
    const tokenNumbers = await Promise.all(
      Array.from({ length: 1 }, (_, i) => cont.methods.tokenByIndex(i).call()),
    );
    const tokenUris = await Promise.all(
      tokenNumbers.map((tokenNumber) =>
        cont.methods.tokenURI(tokenNumber).call(),
      ),
    );
    return tokenUris;
  };

  private getTokenUriInformation = async (uri: string) => {
    const data = await axios.get<TokenData>(uri);
    return data.data;
  };
}
