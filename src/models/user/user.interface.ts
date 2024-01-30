import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  photo: string;
  role: string;
  phone: string;
  address: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: boolean;
  active: boolean;
  verifyPassword: (
    inputPassword: string,
    userPassword: string
  ) => Promise<boolean>;
}
