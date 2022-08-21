import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

export const ipfsSchema = createSchema(
  {
    originalFileName: Type.string({ required: true }),
    fileName: Type.string({ required: true }),
    hash: Type.string({ required: true }),
  },
  { timestamps: true },
);

const Ipfs = typedModel('ipfs', ipfsSchema);
export type IpfsDoc = ExtractDoc<typeof ipfsSchema>;
export default Ipfs;
