import { createRouter } from "next-connect";
import axios from "axios";
import dbConnect from "@/utils/dbConnect";
import mongoose from "mongoose";
import formidable from 'formidable';
import { promises as fs } from 'fs';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false, 
  },
};

const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

const doubtSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String }, // URL of the image
  createdAt: { type: Date, default: Date.now },
});
const Doubt = mongoose.models.Doubt || mongoose.model("Doubt", doubtSchema);

const router = createRouter();

dbConnect();

router.post(async (req, res) => {
  try {
    
    const form = formidable({
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          
          reject(err);
        }
        
        resolve([fields, files]);
      });
    });

    const { text } = fields;
    
    
    if (!text || !text.toString().trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    let imageUrl = null;
    if (files && files.image && files.image[0]) {
      const imageFile = files.image[0];
      
      try {
        const imageBuffer = await fs.readFile(imageFile.filepath);
        const base64Image = imageBuffer.toString('base64');
        
        const formData = new FormData();
        formData.append('key', IMGBB_API_KEY);
        formData.append('image', base64Image);
        
        const imgbbResponse = await axios.post(
          'https://api.imgbb.com/1/upload',
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            }
          }
        );
        
        imageUrl = imgbbResponse.data.data.url;

        await fs.unlink(imageFile.filepath);
        
      } catch (imgError) {
        if (imgError.response) {
        }
      }
    }

    const newDoubt = new Doubt({ 
      text: text.toString().trim(), 
      image: imageUrl 
    });
    await newDoubt.save();
    console.log('Doubt saved successfully');
    res.status(201).json(newDoubt);
  } catch (error) {
    console.error("Error posting doubt:", error);
    res.status(500).json({ 
      error: "Failed to post doubt", 
      details: error.message 
    });
  }
});

// Fetch all doubts
router.get(async (req, res) => {
  try {
    const doubts = await Doubt.find().sort({ createdAt: -1 });
    res.status(200).json(doubts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doubts" });
  }
});

export default router.handler();
