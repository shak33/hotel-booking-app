import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserInterface {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema = new Schema<UserInterface>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  firstName: {
    type: String, 
    required: true
  },
  lastName: {
    type: String, 
    required: true
  }
});

userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);

    next();
  }
});

export default model<UserInterface>('User', userSchema);