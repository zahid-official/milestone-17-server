/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import envVars from "../config/env";
import AppError from "../errors/AppError";
import httpStatus from "http-status-codes";
import path from "path";
import ejs from "ejs";

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: envVars.SMTP.HOST,
  port: envVars.SMTP.PORT,
  secure: true,
  auth: {
    user: envVars.SMTP.USERNAME,
    pass: envVars.SMTP.PASSWORD,
  },
});

// Define email options interface
interface EmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData?: Record<string, any>;
  attachments?: {
    filename: string;
    content: string | Buffer;
    contentType: string;
  }[];
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments,
}: EmailOptions) => {
  try {
    const templatePath = path.join(__dirname, `templates/${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, templateData);

    await transporter.sendMail({
      from: envVars.SMTP.FROM,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });
  } catch (error: any) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Error sending email"
    );
  }
};
