import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_COLLECTIONSTRING);

        console.log("Lien ket DB thanh cong");
    } catch (error) {
        console.error("Loi khi ket noi DB");
        process.exit(1);
    }
};
