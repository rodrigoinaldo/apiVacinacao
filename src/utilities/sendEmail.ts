import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lagado75@gmail.com', 
    pass: 'inaldo123'         
  }
});

export const mailOptions = {
  from: 'lagado75@gmail.com', 
  to: '', 
  subject: 'Test Email from Nodemailer in TypeScript',
  text: 'Hello from Nodemailer!'
};




