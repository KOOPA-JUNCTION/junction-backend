import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

export const userSchema = createSchema(
  {
    hexAddress: Type.string(),
    bech32Address: Type.string(),
  },
  { timestamps: true },
);

const User = typedModel('user', userSchema);
export type UserDoc = ExtractDoc<typeof userSchema>;
export default User;
