import {GoogleGenAI} from '@google/genai';
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from 'axios'
import { v2 as cloudinary} from "cloudinary";
import FormData from "form-data";
// import { GoogleGenerativeAI } from "@google/generative-ai";
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
import { upload } from '../configs/multer.js';
import connectCloudinary from '../configs/cloudinary.js';

export const generateArticle = async (req,res)=>{
    try{
       console.log("hello");
        const { userId, plan, free_usage } = req;
        const {prompt} = req.body;
        console.log("USER:", userId);
    console.log("PLAN:", plan);
    console.log("FREE_USAGE:", free_usage);
        
        if(plan !== 'premium' && free_usage >= 10){
            return res.json({ success: false, message: "Limit reached, Upgrade to continue."})
        }
        
    const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  console.log(response.text);
const content = response.text

await sql`INSERT INTO creations (user_id,prompt,content,type) VALUES(${userId},${prompt}, ${content}, 'article')`;

if (plan !== "premium") {
      const newUsage = free_usage + 1;

      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: newUsage
        }
      });

      // optional: keep req in sync for this request
      req.free_usage = newUsage;
    }

res.json({ success: true,content});

    }
    catch (error){
        console.log(error.message)
        res.json({
            success: false, message: error.message
        })
    }
}


export const generateBlogTitle = async (req,res)=>{
    try{
        
        console.log("hello");
        const { userId, plan, free_usage } = req;
        const {prompt} = req.body;
        console.log(prompt);
        // const plan = req.plan;
        // console.log(plan);
        // const free_usage = req.free_usage;
        console.log("USER:", userId);
    console.log("PLAN:", plan);
    console.log("FREE_USAGE:", free_usage);

        if(plan !== 'premium' && free_usage >= 10){
            return res.json({ success: false, message: "Limit reached, Upgrade to continue."})

        }

        

        const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
        {
            role: "user",
            parts: [
        { text: prompt }
      ]
        }],
    temperature: 0.7,
    max_tokens: 100,
});
console.log(response.text)
const content = response.text;
await sql`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},${prompt}, ${content}, 'blog-title')`;

if (plan !== "premium") {
      const newUsage = free_usage + 1;

      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: newUsage
        }
      });

      // optional: keep req in sync for this request
      req.free_usage = newUsage;
    }


res.json({ success: true,content})

    }
    catch (error){
        console.log(error.message)
        res.json({
            success: false, message: error.message
        })
    }
}




// export const generateImage = async (req, res) => {
//   try {
//     // const { userId } = req.auth();
//     const { prompt, publish, style_id = 4, size = '1-1' } = req.body;
// if (!prompt) {
//       return res.json({ success: false, message: "Prompt is required" });
//     }
//     const options = {
//       method: 'POST',
//       url: 'https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/quick.php',
//       headers: {
//         'x-rapidapi-key': '0b2914ac9fmsh856c83537bb1a75p1ba37bjsneba646cd9a73',
//         'x-rapidapi-host': 'ai-text-to-image-generator-flux-free-api.p.rapidapi.com',
//         'Content-Type': 'application/json'
//       },
//       data: {
//         prompt : prompt,
//         style_id : style_id,
//         size : size
//       }
//     };
//     console.log("hello")
//     const response = await axios.request(options);
//     console.log("RapidAPI Response:", response.data);

//     // 🔥 Correct Image URL Path
//  const generatedImageUrl =
//   response.data?.result?.data?.results?.[0]?.image ||
//   response.data?.result?.data?.results?.[0]?.url;
//   console.log(generatedImageUrl);
//    if (!generatedImageUrl) {
//       return res.json({
//         success: false,
//         message: "Image URL not found in RapidAPI response."
//       });
//     }
//     // console.log("RESULTS:", response.data.result.data.results);

//     // Upload to cloudinary
//     const uploadResult = await cloudinary.uploader.upload(generatedImageUrl);
//     console.log("hello");

//     // Save to DB
//     // await sql`
    //   INSERT INTO creations (user_id, prompt, content, type, publish)
    //   VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    // `;

//     return res.json({
//       success: true,
//       content: uploadResult.secure_url
//     });

//   } catch (error) {
//     console.error("Backend Error:", error.response?.data || error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// export const generateImage = async (req, res) => {
//   try {
//     const { prompt, publish } = req.body;
//     const { userId, plan } = req;
//     if(plan !== 'premium' ){
//             return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
//         }
//     if (!prompt) {
//       return res.json({
//         success: false,
//         message: "Prompt is required"
//       });
//     }
// console.log("CLIPDROP KEY:", process.env.CLIPDROP_API_KEY ? "FOUND" : "MISSING");

//     // 🔥 Clipdrop API call (Text → Image)
//     const clipdropResponse = await axios.post(
//       "https://clipdrop-api.co/text-to-image/v1",
//       {
//         prompt: prompt
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CLIPDROP_API_KEY}`,
//           "Content-Type": "application/json"
//         },
//         responseType: "arraybuffer" // ⚠️ VERY IMPORTANT
//       }
//     );

//     console.log("h1");
//     // 🔥 Convert image buffer → base64
//     const base64Image =
//       "data:image/png;base64," +
//       Buffer.from(clipdropResponse.data).toString("base64");
// console.log("h2");
//     // 🔥 Upload to Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(base64Image, {
//       folder: "ai-generated",
//       format: "png"
//     });
//         // Save to DB
//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type, publish)
//       VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image', ${publish ?? false})
//     `;

//     return res.json({
//       success: true,
//       content: uploadResult.secure_url
//     });

//   } catch (error) {
//     console.error(
//       "Backend Error:",
//       error.response?.data || error.message
//     );

//     return res.json({
//       success: false,
//       message: error.message
//     });
//   }
// };


// import FormData from "form-data";
// import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt, publish } = req.body;
    const { userId, plan } = req;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions"
      });
    }

    if (!prompt) {
      return res.json({ success: false, message: "Prompt is required" });
    }

    // 🔥 FORM DATA (IMPORTANT)
    const formData = new FormData();
    formData.append("prompt", prompt);

    // 🔥 CLIPDROP REQUEST
    const clipdropResponse = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY
        },
        responseType: "arraybuffer"
      }
    );

    // 🔥 Convert buffer → base64
    const base64Image =
      "data:image/png;base64," +
      Buffer.from(clipdropResponse.data).toString("base64");

    // 🔥 Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "ai-generated",
      format: "png"
    });

    // Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image', ${publish ?? false})
    `;

    res.json({
      success: true,
      content: uploadResult.secure_url
    });

  } catch (error) {
    console.error(
      "Backend Error:",
      error.response?.data?.toString() || error.message
    );

    res.json({
      success: false,
      message: "Image generation failed"
    });
  }
};



export const removeImageBackground = async (req,res)=>{
    try{
        const image = req.file;
        const { userId, plan } = req;
        if (!image) {
      return res.json({
        success: false,
        message: "No image uploaded"
      });
    }
        if(plan !== 'premium' ){
            return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
        }
        

const uploadResult = await cloudinary.uploader.upload(
      image.path,
      {
        background_removal: "cloudinary_ai",
        format: "png"
      }
    );

await sql`INSERT INTO creations (user_id,prompt,content,type,publish) VALUES (${userId},'Remove background from image', ${uploadResult.secure_url}, 'image')`;

console.log(uploadResult.secure_url);

    console.log("Background removed successfully");

    return res.json({
      success: true,
      content: uploadResult.secure_url,
      version: uploadResult.version
    });

    }
    catch (error){
        console.log(error.message)
        res.json({
            success: false, message: error.message
        })
    }
}




export const removeImageObject = async (req,res)=>{
    try{
        // const { userId } = req.auth();
        const { object } = req.body;
        const image = req.file;
        const { userId, plan } = req;
        console.log(image);
        if (!image || !object) {
      return res.json({
        success: false,
        message: "Image or object not provided"
      });
    }
        if(plan !== 'premium' ){
            return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
        }

// const {public_id} = await cloudinary.uploader.upload(image.path)

// const imageUrl = cloudinary.url(public_id , {
//     transformation: [{effect: `gen_remove:${object}`}],
//     resource_type: 'image'
// })

const result = await cloudinary.uploader.upload(image.path, {
  transformation: [
    {
     effect: `gen_remove:${object}`
    }
  ],
  format: "png"
});

console.log(result.secure_url);



await sql`INSERT INTO creations (user_id,prompt,content,type,publish) VALUES (${userId}, ${`Removed ${object} from image`}, ${result.secure_url},  'image',false)`;


return res.json({
      success: true,
      content: result.secure_url   // ✅ FIXED
    });

    }
    catch (error){
        console.log(error.message)
        res.json({
            success: false, message: error.message
        })
    }
}





export const resumeReview = async (req,res)=>{
    try{
        console.log("hello");
       const { userId, plan } = req;
        const resume = req.file;
        
        // console.log(plan)

        if(plan !== 'premium' ){
            return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
        }
if (!resume) {
      return res.json({
        success: false,
        message: "Resume file not received"
      });
    }
const dataBuffer = fs.readFileSync(resume.path)
const pdfData = await pdf(dataBuffer)


const prompt = `Review the following resume and provide constructive feedback on its strenghts,weaknesses, and areas for improvement and a ATS score out of 100 on top . Resume Content: ${pdfData.text}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
            role: "user",
            parts: [
        { text: prompt }
      ]
        }],
    temperature: 0.7,
    max_tokens: 100,
    });

const review = response.text


await sql`INSERT INTO creations (user_id,prompt,content,type,publish) VALUES (${userId}, 'Review the uploaded resume',  ${review}, 'resume-review',false)`;

    fs.unlinkSync(resume.path);
res.json({ success: true,content:review})

    }
    catch (error){
        console.log(error.message)
        res.json({
            success: false, message: error.message
        })
    }
}

// export const resumeReview = async (req, res) => {
//   try {
//     const resume = req.file;

//     if (!resume) {
//       return res.json({
//         success: false,
//         message: "Resume file not received"
//       });
//     }

//     // 1️⃣ Read PDF
//     const buffer = fs.readFileSync(resume.path);

//     // 2️⃣ Extract text
//     const pdfData = await pdf(buffer);

//     // 3️⃣ Build AI prompt
//     const prompt = `
// You are a professional resume reviewer.

// Review the following resume and provide:
// 1. Strengths
// 2. Weaknesses
// 3. Areas for improvement
// 4. ATS optimization tips

// Resume Content:
// ${pdfData.text}
// `;

//     // 4️⃣ AI call
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [
//         {
//             role: "user",
//             parts: [
//         { text: prompt }
//       ]
//         }],
//     temperature: 0.7,
//     max_tokens: 100,
//     });

// //     const response = await ai.models.generateContent({
// //     model: 'gemini-2.5-flash',
// //     contents: prompt,
// //   });

    

//     const review = response.text

//     // 5️⃣ Cleanup
//     fs.unlinkSync(resume.path);

//     // 6️⃣ Send AI review
//     return res.json({
//       success: true,
//       content: review
//     });

//   } catch (error) {
//     console.error(error);
//     return res.json({
//       success: false,
//       message: error.message
//     });
//   }
// };