'use server';

import { Resend } from 'resend';

// Initialize Resend with API key
// Note: This requires RESEND_API_KEY to be set in .env
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormState {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
}

export async function sendContactEmail(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const company = formData.get('company') as string || 'Not provided';
    const phone = formData.get('phone') as string || 'Not provided';

    // Basic validation
    if (!name || name.length < 2) {
        return { success: false, message: 'Please enter a valid name' };
    }
    if (!email || !email.includes('@')) {
        return { success: false, message: 'Please enter a valid email address' };
    }
    if (!message || message.length < 10) {
        return { success: false, message: 'Message must be at least 10 characters long' };
    }

    try {
        // Check if API key is configured
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY is not set. Simulating email send.');
            // Simulate success for development/demo if key is missing
            // In production you might want to return an error, but for dev we simulate
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { success: true, message: 'Message sent successfully! (Simulated Mode - Set RESEND_API_KEY)' };
        }

        const { data, error } = await resend.emails.send({
            from: 'Kingsforth Contact <onboarding@resend.dev>', // Update this to your verified domain in production
            to: ['contact@kingsforth.com'], // In dev you can only send to your own email if using free tier
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Company: ${company}
        Phone: ${phone}
        
        Message:
        ${message}
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return { success: false, message: 'Failed to send message. Please try again later.' };
        }

        return { success: true, message: 'Message sent successfully!' };

    } catch (error) {
        console.error('Unexpected error sending email:', error);
        return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }
}
