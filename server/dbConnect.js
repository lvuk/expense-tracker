import mongoose from 'mongoose';

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB successfully connected...');
  } catch (error) {
    console.log(`${error} did not connect...`);
  }
};

export default connectDB;
