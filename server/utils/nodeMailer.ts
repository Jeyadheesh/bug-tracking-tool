import nodemailer, { SendMailOptions } from "nodemailer";
import Mailgen, { ContentBody } from "mailgen";
import { config } from "dotenv";
config({ path: ".env" });
// console.log(process.env.EMAIL, process.env.EPASSWORD);

let mailConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EPASSWORD,
  },
};

// console.log("Email", process.env.EMAIL);
let transporter = nodemailer.createTransport(mailConfig);

let mailGenerator: Mailgen = new Mailgen({
  theme: "default", //cerberus , salted
  product: {
    name: "TrackDown",
    link: process.env.CLIENT_PORT as string,
  },
});

export const sendMail = (
  name: string,
  email: string,
  message: string,
  title: string
): void => {
  console.log(email, name);

  let response: Mailgen.Content = {
    body: {
      name: name,
      intro: message,
      action: {
        instructions:
          "You can see the details of the notification by clicking the button below",
        button: {
          color: "#10b981",
          text: "Go to website",
          link: process.env.CLIENT_PORT + "/dashboard",
        },
      },
    },
  };

  let mail = mailGenerator.generate(response);

  let content = {
    from: process.env.EMAIL,
    to: email,
    subject: title,
    html: mail,
  };

  transporter.sendMail(content, (err, info) => {
    if (err) console.log("Error to send mail", err);
    else {
      console.log("Email Sent");
    }
  });
};

export const SendOtpMail = async (
  email: string,
  otp: string
): Promise<string> => {
  let response = {
    body: {
      name: "User",
      intro: "Your OTP for verification is : <b>" + otp + "</b>",
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP for Verification",
    html: mail,
  };

  const ans = await transporter.sendMail(message);
  if (ans.accepted) {
    console.log("Email Sent");
    return "Email Sent";
  }
  console.log("Error to send email");
  return "Error to send email";
};
