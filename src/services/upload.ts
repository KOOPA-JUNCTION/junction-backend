import fs from 'fs';
import path from 'path';
import { Inject, Service } from 'typedi';
import pinataSDK from '@pinata/sdk';
import config from '@src/config';
import Ipfs from '@src/models/ipfs';
import { Readable } from 'stream';
import HttpException from '@src/exceptions/HttpException';

@Service()
export default class UploadService {
  constructor(
    @Inject('models.ipfs') private ipfsModel: typeof Ipfs,
    private pinata = pinataSDK(config.pinata.apiKey, config.pinata.secretKey),
  ) {}

  private randHex = (bytes: number) =>
    [...Array(bytes)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');

  public uploadImage = async (file: Express.Multer.File) => {
    try {
      const extension = file.originalname.split('.').pop();
      const fileName = `${this.randHex(32)}.${extension}`;
      const filePath = path.join(__dirname, '../../files', fileName);
      const writeStream = fs.createWriteStream(filePath);
      writeStream.write(file.buffer);
      await new Promise((resolve) => writeStream.on('finish', resolve));
      const stream = fs.createReadStream(filePath);
      const resp = await this.pinata.pinFileToIPFS(stream);
      await this.ipfsModel.insertMany({
        originalFileName: file.originalname,
        fileName,
        hash: resp.IpfsHash,
      });

      return {
        originalFileName: file.originalname,
        fileName,
        url: `/files/${fileName}`,
        hash: resp.IpfsHash,
      };
    } catch (e) {
      throw new HttpException(500, `Upload failed: ${e}`);
    }
  };
}
