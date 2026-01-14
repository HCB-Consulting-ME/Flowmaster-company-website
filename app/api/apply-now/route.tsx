import { NextResponse } from 'next/server';
import { transporter } from '@/lib/mailer';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        // Extract fields
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const jobTitle = formData.get('jobTitle') as string;
        const cvFile = formData.get('cv') as File;

        if (!cvFile) {
            return NextResponse.json({ error: "No CV uploaded" }, { status: 400 });
        }

        // Convert File to Buffer for Nodemailer
        const bytes = await cvFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const mailOptions = {

            to: process.env.NODE_MAILER_EMAIL,
            subject: `New Job Application: ${jobTitle} - ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPosition: ${jobTitle}`,
            attachments: [
                {
                    filename: cvFile.name,
                    content: buffer,
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Application submitted successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }
}