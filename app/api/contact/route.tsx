import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const host = process.env.NEXT_PUBLIC_EMAIL_HOST;
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const formData = await request.json();
  const {fullname, phone, email, street} = formData;


  // create transporter object
  const transporter = nodemailer.createTransport({
    service: host,
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: username,
      to: 'antoniotest227@gmail.com',
      subject: "Trying to contact",
      html: `<div>
                <h1>New User want to contact you</h1>
                <div>
                <p>Full name: ${fullname}</p> 
                <p>Phone: ${phone}</p>
                <p>Email: ${email}</p>
                <p>Street: ${street}</p>
                </div>
            </div>`,
    });

    return NextResponse.json({ message: "Success: email was sent", mail });
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "COULD NOT SEND MESSAGE" });
  }
}
