import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_USER_PASSWORD } from '$env/static/private';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_USER_PASSWORD
	}
});

type EmailParams = {
	to: string;
	subject: string;
	htmlContent: string;
};

export async function sendEmail({
	to,
	subject,
	htmlContent
}: EmailParams): Promise<{ success: boolean; message: string }> {
	try {
		await transporter.sendMail({
			from: EMAIL_USER,
			to,
			subject,
			html: htmlContent
		});

		return {
			success: true,
			message: `Email sent to ${to}`
		};
	} catch (e) {
		console.error(e);
		return {
			success: false,
			message: `Failed to send email ${JSON.stringify(e)}`
		};
	}
}

export class EmailService {
	static async sendPasswordReset(to: string, resetToken: string) {
		const htmlContent = `
		<div style="font-family: Arial, sans-serif; font-size: 16px;">
			<h1>Password Reset</h1>
			<p>
				We've recieved a request to reset your password. If you didn't make this request  
				ignore the email, otherwise click the link below to reset your password
			</p>
			<p>
				<a href="${PUBLIC_BASE_URL}/reset-password?token=${resetToken}" 
					style="color: #00b800"
				>Reset your password</a>
			</p>
			
			<p>
				If you need help or have any questions, please contact us at
				<a href="mailto:couture@gmail.com">Couture</a>
			</p>
		</div>
		`;

		return sendEmail({
			to,
			subject: 'Password Reset',
			htmlContent
		});
	}
}
