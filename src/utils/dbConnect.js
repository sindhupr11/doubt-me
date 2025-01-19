import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState) return; // Use existing connection if available

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB connected");
};

export default dbConnect;
