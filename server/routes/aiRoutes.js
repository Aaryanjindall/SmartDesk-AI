import express from 'express'
import { generateArticle, generateBlogTitle, generateImage,removeImageBackground,removeImageObject,resumeReview,summarize } from '../controllers/aiController.js';
import { auth } from "../middlewares/auth.js";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
const aiRouter = express.Router();

aiRouter.post('/generate-article',auth,generateArticle)
console.log("routes mai aagya");
aiRouter.post('/generate-blog-title',auth,generateBlogTitle)
aiRouter.post('/generate-image',auth,generateImage)
aiRouter.post('/remove-image-background',auth, upload.single('image') ,  removeImageBackground)
aiRouter.post('/remove-image-object',auth ,upload.single('image') , removeImageObject)
aiRouter.post('/resume-review', upload.single('resume') ,auth, resumeReview)
aiRouter.post('/summarize-data',upload.single('file'),auth,summarize)

export default aiRouter