import { MailAdapter, SendEmailData } from "../mail-adapter";
import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "bb5c21593c3635",
        pass: "fea8fa1bc3cd1b"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendEmailData): Promise<void> {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: "Gomes <mth.ggss@gmail.com",
            subject,
            html: body
        });
    }

}