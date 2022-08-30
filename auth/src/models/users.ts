import { Document, Schema, Model, model, InferSchemaType } from 'mongoose';
import { Password } from '../services/password';

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

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
});

// type User = InferSchemaType<typeof userSchema>;

export const User = model<User>('User', userSchema);
