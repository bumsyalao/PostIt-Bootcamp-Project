
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
    html: `<body><div>
            <div style="background-color:#f2f3f5;padding:20px">
              <div style="max-width:600px;margin:0 auto">
               <div 
                style="
                  background:#fff;
                  font:14px sans-serif;
                  color:#686f7a;
                  border-top:4px solid #e57373;
                  border-bottom:4px solid #e57373;
                  border-right:4px solid #e57373;   
                  border-left:4px solid #e57373;
                  margin-bottom:20px">
                <div
                  style="
                   border-bottom:1px solid #f2f3f5;
                   padding-bottom:20px;
                   padding-top:20px">
                  <h4 
                    style="
                      padding-top:0; 
                      padding-left:20px; 
                      margin:0; 
                      font-size:30px;">
                    <img height="40px" style="margin-left: 2%"                    src="http://res.cloudinary.com/dcpfdxsly/image/upload/v1510790648/feminist_zea7fw.png">Post-It</h4>
                </div>
                 
                <div style="padding:30px 20px;line-height:1.5em;color:#686f7a">
                  <p style="color:#737373;
                  font-size:20px">Hi, you have a new message</p>
                  <p 
                    style="
                      border-bottom:1px solid #f2f3f5;
                      padding-bottom:20px;
                      margin-bottom:20px;
                      color:#686f7a">
                  </p>
                  <p 
                    style="
                      border-bottom:1px solid #f2f3f5;
                      padding-bottom:20px;
                      margin-bottom:20px;
                      color:#686f7a">
                       ${message}
                  </p>
                  <a href="https://postit-now.herokuapp.com" 
                    style="
                      display:inline-block;
                      font-size:15px;color:#ffffff;
                      padding:10px 15px;
                      text-decoration:none;
                      background-color:#e57373;
                      border-radius:3px" 
                      target="_blank">
                      View In POST-IT
                  </a>
                </div>
             </div>
            </div>
          </body>`
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

export const sendForgotPasswordMail = (email, hash, headers) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
      // secure:true for port 465, secure:false for port 587
    auth: {
      user: useremail,
      pass: userpass
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"POST_IT" <postit.nownow@gmail.com>', // sender address
    to: email,
    subject: 'Reset Your Password_POSTIT', // Subject line
    html: `<body><div>
            <div style="background-color:#f2f3f5;padding:20px">
              <div style="max-width:600px;margin:0 auto">
               <div 
                style="
                  background:#fff;
                  font:14px sans-serif;
                  color:#686f7a;
                  border-top:4px solid #e57373;
                  border-bottom:4px solid #e57373;
                  border-right:4px solid #e57373;   
                  border-left:4px solid #e57373;
                  margin-bottom:20px">
                <div 
                  style="
                   border-bottom:1px solid #f2f3f5;
                   padding-bottom:20px;
                   padding-top:20px">
                  <h4 
                    style="
                      padding-top:0; 
                      padding-left:20px; 
                      margin:0; 
                      font-size:30px;">
                      <img height="40px"
                        style="margin-left: 2%"
                        src="http://res.cloudinary.com/dcpfdxsly/image/upload/v1510790648/feminist_zea7fw.png">
                      Post-It</h4>
                </div>
                <div style="padding:30px 20px;line-height:1.5em;color:#686f7a">
                  <p style="color:#737373">Hi ${email},</p>
                  <p 
                    style="
                      border-bottom:1px solid #f2f3f5;
                      padding-bottom:20px;
                      margin-bottom:20px;
                      color:#686f7a">
                     A password reset for your account was requested.
                  </p>
                  <p 
                    style="
                      border-bottom:1px solid #f2f3f5;
                      padding-bottom:20px;
                      margin-bottom:20px;
                      color:#686f7a">
                      Please click the button below to change your password.
                  </p>
                  <a href="http://${headers}/reset-password/${hash}" 
                    style="
                      display:inline-block;
                      font-size:15px;color:#ffffff;
                      padding:10px 15px;
                      text-decoration:none;
                      background-color:#e57373;
                      border-radius:3px" 
                      target="_blank">
                      Change Your Password
                  </a>
                </div>
             </div>
            </div>
          </body>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    console.log(`${info.messageId} send: ${info.response}`);
  });
};
