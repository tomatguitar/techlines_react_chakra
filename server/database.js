import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
      const connect = await mongoose.connect(process.env.MONGODB_URI);
      console.log('Mongo DB connected:', connect.connection.host);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDatabase;
