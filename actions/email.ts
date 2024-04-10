"use server";
import nodemailer from "nodemailer";

export async function sendMail(payload: any, image: any) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wbs.dickson@gmail.com",
      pass: "ohsv ftpy ccyz wecd",
    },
  });

  let mailOptions = {
    from: {
      name: "Memory Quest",
      address: "support@memory-quest.com",
    },
    to: payload.emails.split(","),
    subject: "Memory Quest Certificate",
    html: `<h1>Congratulations ${payload.name}</h1>`,
    attachments: [
      {
        filename: "certificate.jpg",
        content: image.split("base64,")[1],
        encoding: "base64",
      },
    ],
  };

  console.log(mailOptions);

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}
