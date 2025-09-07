import sendMail from "./mail.js";
import dotenv from "dotenv";
dotenv.config();

import { verificationMailTemplate } from "./verificationMailTemplate.js";


const sendVerificationMail = async (email, verificationToken) => {
    try {
        const info = await sendMail(email, 'VERIFICATION CODE', verificationMailTemplate(verificationToken));
        // console.log(info);
    } catch (error) {
        throw new Error(`Error sending verificationmail : ${error}`)
    }
}

export default sendVerificationMail;