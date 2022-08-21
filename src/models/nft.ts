import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

export const nftSchema = createSchema(
  {
    contractAddress: Type.string(),
    name: Type.string(),
    imageFileName: Type.string(),
    description: Type.string(),
    properties: Type.array().of(
      Type.object({ required: true }).of({
        trait_type: Type.string({ required: true }),
        value: Type.string({ required: true }),
      }),
    ),
    owner: Type.string(),
  },
  { timestamps: true },
);

const Nft = typedModel('nft', nftSchema);
export type NftDoc = ExtractDoc<typeof nftSchema>;
export default Nft;
