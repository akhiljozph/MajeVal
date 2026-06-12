import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class MailTransporter {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: process.env.MAJ_EMAIL || 'media.akhiljoseph@gmail.com',
                pass: process.env.MAJ_EMAIL_PASSWORD || 'jprj bjku ncii nkfv'
            },
            secure: true,
        });
    }

    private compileTemplate(html: string, variables: Record<string, string>): string {
        let compiled = html;
        for (const [key, value] of Object.entries(variables)) {
            compiled = compiled.replace(new RegExp(`{{${key}}}`, 'g'), value);
        }
        return compiled;
    }

    async sendWelcomeEmail(to: string, name: string, role: string) {
        console.log("Invoking mail sender");
        try {
            const normalizedRole = role.toLowerCase();

            const templatePath = path.join(__dirname, 'templates', `welcome-${normalizedRole}.html`);

            const rawHtml = await fs.readFile(templatePath, 'utf-8');

            const emailVariables = {
                name: name,
                loginUrl: process.env.FRONTEND_URL || 'http://localhost:1024/login'
            };

            const finalHtml = this.compileTemplate(rawHtml, emailVariables);

            const subjects: Record<string, string> = {
                admin: 'Internal Admin Account Provisioned',
                examiner: 'Instructor Access Granted',
                examinee: 'Welcome to your MajeVal Portal!'
            };

            await this.transporter.sendMail({
                from: '"MajeVal Platform" <noreply@majeval.com>',
                to: to,
                subject: subjects[normalizedRole] || 'Welcome to MajeVal',
                html: finalHtml,
            });

            console.log(`Role-based [${role}] welcome email dispatched to ${to}`);
        } catch (error) {
            console.error('Failed to dispatch role-based template email:', error);
        }
    }
}

