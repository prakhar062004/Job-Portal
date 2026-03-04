import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () =>
      console.log('Database Connected')
    );

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(process.env.MONGODB_URI);

  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
};

export default connectDB;