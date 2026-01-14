import { graphClient } from "@/lib/graphClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Parse the body from the request
        const body = await request.json();
        const { name, email, message, company } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        // Send the email via Microsoft Graph
        await graphClient.api(`/users/${process.env.EMAIL_FROM}/sendMail`).post({
            message: {
                subject: `New Contact Form Submission from ${name}`,
                body: {
                    contentType: "HTML",
                    content: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>
            <p><strong>Company:</strong><br>${company || "Not provided"}</p>
          `,
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: process.env.EMAIL_FROM!,
                        },
                    },
                ],
            },
            saveToSentItems: "true",
        });

        return NextResponse.json(
            { message: "Message sent successfully!" },
            { status: 200 }
        );
    } catch (err: any) {
        console.error("Error sending email:", err);
        return NextResponse.json(
            { error: "Failed to send message.", details: err.message },
            { status: 500 }
        );
    }
}