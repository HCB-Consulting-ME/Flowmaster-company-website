import { NextResponse } from 'next/server';
import { graphClient } from '@/lib/graphClient';

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

        // Convert File to Buffer then to Base64 for Graph API
        const arrayBuffer = await cvFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Content = buffer.toString('base64');

        await graphClient.api(`/users/${process.env.CAREER_EMAIL}/sendMail`).post({
            message: {
                subject: `New Job Application: ${jobTitle} - ${name}`,
                body: {
                    contentType: "HTML",
                    content: `
                        <h3>New Job Application Received</h3>
                        <p><strong>Job Title:</strong> ${jobTitle}</p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                    `,
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: process.env.CAREER_EMAIL!,
                        },
                    },
                ],
                attachments: [
                    {
                        "@odata.type": "#microsoft.graph.fileAttachment",
                        name: cvFile.name,
                        contentType: cvFile.type || "application/pdf",
                        contentBytes: base64Content,
                    },
                ],
            },
            saveToSentItems: "true",
        });

        return NextResponse.json({ message: "Application submitted successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }
}