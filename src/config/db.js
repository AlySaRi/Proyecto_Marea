import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Conectado a MongoDB: ${db.connection.name}`);
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
