import nodemailer from "nodemailer";
import Mailgen from "mailgen";
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

let mailGenerator = new Mailgen({
  theme: "default", //cerberus , salted
  product: {
    name: "TrackDown",
    link: process.env.CLIENT_PORT as string,
  },
});

export const MailInTable = (productData: any, productStatus: string): void => {
  let proccessData = productData.map((li: any) => {
    return {
      product: li.title,
      quantity: li.quantity,
      price: `$${li.quantity * li.price}`,
    };
  });

  let response = {
    body: {
      name: productData[0].userName,
      intro: productStatus,
      action: {
        instructions:
          "To check your product details, please click the button :",
        button: {
          color: "#A033CE",
          text: "Check Your Cart  🛒",
          link: process.env.CLIENT_PORT + "/usercart",
        },
      },
      table: {
        data: proccessData,
        columns: {
          customWidth: {
            item: "75%",
            price: "15%",
            quantity: "10%",
          },
          customAlignment: {
            product: "left",
            quantity: "center",
            price: "center",
          },
        },
      },
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: productData[0].userEmail,
    subject: "EBuddy Product Status 😄",
    html: mail,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) console.log("Error to send mail", err);
    else {
      console.log("Email Sent");
    }
  });
};

export const MainInFormal = (name: string, email: string): void => {
  let response = {
    body: {
      name: name,
      intro: " Intro For Mail",
      action: {
        instructions: "Instruction for below button",
        button: {
          color: "#A033CE",
          text: "Button Name",
          link: process.env.CLIENT_PORT + "/link",
        },
      },
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: "Subject Name",
    html: mail,
  };

  transporter.sendMail(message, (err, info) => {
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
    return "Email Sent";
  }
  return "Error to send email";
};
