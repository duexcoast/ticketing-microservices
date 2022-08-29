import { Document, Schema, Model, model, InferSchemaType } from 'mongoose';

export interface User {
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// type User = InferSchemaType<typeof userSchema>;

export const User = model<User>('User', userSchema);

const user = new User({
  email: 'jfdksl',
  password: 'kdfsjlafds',
});
