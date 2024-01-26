import mongoose from "mongoose";

export default function connectToDB() {
    const connectionURL = `${process.env.DATABASE_TYPE}${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_SERVER}`;
    mongoose.connect(connectionURL);
    
}


