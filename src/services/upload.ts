import { Service } from 'typedi';

@Service()
export default class UploadService {
  constructor() {}

  public uploadImage = (file: Express.Multer.File) => {};
}
