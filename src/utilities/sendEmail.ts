import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'exemplo5@gmail.com', 
    pass: 'exemplo123$fgh'         
  }
});

export const mailOptions = {
  from: 'exemplo5@gmail.com', 
  to: '', 
  subject: 'Test Email from Nodemailer in TypeScript',
  text: 'Hello from Nodemailer!'
};




