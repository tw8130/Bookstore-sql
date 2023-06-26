const nodemailer = require("nodemailer")
require('dotenv').config()
const email_config = require("../config/emailConfig")

// const messageOptions = {
//    to: ["tariqmiley@gmail.com", "ndigithejohn@gmail.com","machariab19@gmail.com"],
//   from: process.env.EMAIL_USER,
//   subject: "Email testing || Send from Nodemailer",
//   text:"Wozaaaaa this works" 



// }


const transporter = nodemailer.createTransport(email_config)



async function sendEmailToBorrower(email, remainingDays, overdueDays, charges) {
    let subject, text;

    if (remainingDays === 1) {
        subject = 'Reminder: Book Return Due Tomorrow';
        text = 'Dear borrower,\n\nThis is a friendly reminder that the book you borrowed is due tomorrow. Please return it to the library to avoid any charges for defaulting on the return.\n\nThank you.\nLibrary Management';
    } else if (remainingDays > 0) {
        subject = 'Reminder: Book Return Due Soon';
        text = `Dear borrower,\n\nThis is a friendly reminder that the book you borrowed is due in ${remainingDays} days. Please return it to the library on or before the due date.\n\nThank you.\nLibrary Management`;
    } else {
        subject = 'Reminder: Book Return Overdue';
        text = `Dear borrower,\n\nThis is a reminder that the book you borrowed is overdue by ${overdueDays} day(s). You have been charged ${charges} for defaulting on the return. Please return the book as soon as possible to avoid further charges.\n\nThank you.\nLibrary Management`;
    }

    const messageOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
    };

    try {
          console.log(messageOptions)
        let results = await transporter.sendMail(messageOptions);
         console.log(results);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmailToBorrower