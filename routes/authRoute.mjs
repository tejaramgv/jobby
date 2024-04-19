

import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
// import {feedbackController,contactController,countController} from '../controllers/authController.mjs'

const app = express();

const router = express.Router();
// Multer setup
// router.post('/feedback',feedbackController)
// router.post('/contact',contactController)
// router.put('/countupdate',countController)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'gvtejeshreddy111@gmail.com',
    pass: 'dnjy uubm kynd dxbj ', 
    },
});

// Route to handle email sending
router.post('/apply', upload.single('resume'), async (req, res) => {
const {jobname,firstname,lastname,middlename,email,phoneno,selectedCountry,state,city,pincode,address,degree,fieldOfStudy
,institutionname,location,graduationyear,gpa} = req.body;
const { originalname, buffer } = req.file;

const mailOptions = {
    from: 'gvtejeshreddy111@gmail.com',
    to: ['gvtejeshreddy111@gmail.com',email],
    subject: 'Job Application',
    text: `
    Application For: ${jobname}
    
    Personal Details:
    Name: ${firstname} ${middlename} ${lastname}
    Email: ${email}
    Phone: ${phoneno}
    
    Address:
    Country: ${selectedCountry}
    State: ${state}
    City: ${city}
    Pincode: ${pincode}
    Address: ${address}
    
    Education:
    Degree/Certificate: ${degree}
    Field of Study/Major: ${fieldOfStudy}
    Institution Name: ${institutionname}
    Location: ${location}
    Graduation Year: ${graduationyear}
    GPA: ${gpa}
    
    Find the Resume in Below Attachment:
    `,
    
    attachments: [{ filename: originalname, content: buffer }],
};

try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({success:true, message: 'Email sent successfully' });
} catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({success:false, error: 'An error occurred while sending email' });
}
});


export default router;