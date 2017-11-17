
import nodemailer from 'nodemailer';

require('dotenv').config();

const useremail = process.env.USEREMAIL;
const userpass = process.env.USERPASS;


/**
 * function to send mail
 * @param {array} users array of users to send message to
 * @param {string} message message to be sent to users
 * @param {string} priorityHeader priority of the message
 * @return {void}
 */
const sendMail = (users, message, priorityHeader) => {
  // get email of the users
  let email = '';

  users.forEach((user) => {
    email += `${user.User.email},`;
  });

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: useremail,
      pass: userpass
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"POST_IT" <postit.nownow@gmail.com>',
    to: email,
    subject: `You have a ${priorityHeader} message`,
    html: `
      <div style="width: 100%; background-color: #eeeeee; padding: 2%;">
      <div style="width: 60%; background-color: white; margin: auto;">
        <div style="height: 8%; background-color: #e57373; width:100%; display: flex; flex-direction: row">
          <img height="40px" style="margin-left: 2%; margin-top: 2%" src="http://res.cloudinary.com/dcpfdxsly/image/upload/v1510790648/feminist_zea7fw.png"> <h5 style="color: #000"> POST-IT </h5>
        </div>
        <div style="padding: 8%; color: #000">
          <div class="row">
            Hi, you have a new message:
          </div>
          <div class="next-container" style="border: 2px solid; margin-top:2%; padding: 2%; color: #000">
            ${message}
          </div>
          <div style="border-top: 3px solid #e57373;"></div>
       
        </div>
      </div>
    </div>
    `
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    console.log(`${info.messageId} send: ${info.response}`);
  });
};

export default sendMail;
