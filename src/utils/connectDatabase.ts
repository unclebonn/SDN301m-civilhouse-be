import mongoose from 'mongoose';

export default function connectToDB() {
  const connectionURL = `${process.env.DATABASE_TYPE}${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_SERVER}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
  mongoose
    .connect(connectionURL)
    .then(() => console.log('DB connection successful!'));
}
