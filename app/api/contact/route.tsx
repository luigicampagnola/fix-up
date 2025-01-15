import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const host = process.env.NEXT_PUBLIC_EMAIL_HOST;
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const receive = process.env.NEXT_PUBLIC_EMAIL_RECEIVE;
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
      to: receive,
      subject: "New User Contact Request",
      html: `<div>
                <h3>New User Contact Request</h2>
                <div>
                  <p>You have a new contact request from a user. Please find their details below:</p>
                  <p><b>Full name: </b> ${fullname}</p> 
                  <p><b>Phone: </b> ${phone}</p>
                  <p><b>Email:</b> ${email}</p>
                  <p><b>Street: </b> ${street}</p>
                </div>

                <div>
                  <p>Best regards,</p>
                  <p><b>Fixup Contact Form</b></p>
                </div>
            </div>`,
    });

    return NextResponse.json({ message: "Success: email was sent", mail });
  } catch (error) {
    console.info(error);
    NextResponse.json({ message: "COULD NOT SEND MESSAGE" });
  }
}
