import mongoose from 'mongoose';

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    dbName: 'reco_db',
  });
  console.log(`MongoDB connected: ${conn.connection.host}`);
  return conn;
};

export default connectDB;