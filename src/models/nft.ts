import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

export const nftSchema = createSchema(
  {
    contractAddress: Type.string(),
    name: Type.string(),
    imageFileName: Type.string(),
  },
  { timestamps: true },
);

const Nft = typedModel('nft', nftSchema);
export type NftDoc = ExtractDoc<typeof nftSchema>;
export default Nft;
