import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connnectToDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        //va a esperar
        console.log(`Conectando a la base de datos ${db.connection.name}`);
    } catch (error) {
        console.error("Ha habido un error: ", error);
    }
};

export default connnectToDB;
