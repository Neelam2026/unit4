const nodemailer=require("nodemailer")

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, 
    auth: {
        user: "20f70c31c872b2", 
        pass: "1d84dad9750452", 
      },
    
  });