// app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import { transporter } from '@/lib/mailer';

export async function POST(request: Request) {
    try {
        const { name, email, message, company } = await request.json();

        const mailOptions = {
            to: process.env.NODE_MAILER_EMAIL,
            subject: `New Message from ${name}`,
            text: message,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Submission</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617;">
                <tr>
                    <td align="center" style="padding: 40px 20px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background-color: #0f172a; padding: 30px; text-align: center; border-bottom: 1px solid #334155;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px; font-weight: 700;">FlowMaster</h1>
                                    <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">Contact Form System</p>
                                </td>
                            </tr>

                            <!-- Content -->
                            <tr>
                                <td style="padding: 30px;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td style="padding-bottom: 20px;">
                                                <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0; font-weight: 600;">Sender Name</p>
                                                <p style="margin: 0; font-size: 16px; color: #ffffff; line-height: 1.5;">${name}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom: 20px;">
                                                <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0; font-weight: 600;">Email Address</p>
                                                <p style="margin: 0; font-size: 16px; color: #3b82f6; text-decoration: none; line-height: 1.5;">${email}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom: 20px;">
                                                <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0; font-weight: 600;">Company</p>
                                                <p style="margin: 0; font-size: 16px; color: #ffffff; line-height: 1.5;">${company || 'Not Provided'}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0; font-weight: 600;">Message</p>
                                                <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
                                                    <p style="margin: 0; font-size: 15px; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #0f172a; padding: 20px; text-align: center; border-top: 1px solid #334155;">
                                    <p style="color: #475569; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} FlowMaster. Secured by Enterprise Governance.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}