import nodemailer from 'nodemailer';

async function sendEmail() {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '0xhexmex0x@gmail.com',
          pass: '123QAZwsx!@#'
        }
      });

  var mailOptions = {
    from: '0xhexmex0x@gmail.com',
    to: '0xhossammansour@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  try {
    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export default sendEmail;
