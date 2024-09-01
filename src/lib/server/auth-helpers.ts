import { generateId } from 'lucia';
import prisma from '$lib/server/prisma';
import { compare } from 'bcrypt';

export async function createPasswordResetToken(userId: string): Promise<string> {
	const tokenId = generateId(40);

	await prisma.$transaction(async (tx) => {
		await tx.passwordResetToken.deleteMany({
			where: {
				userId
			}
		});

		await tx.passwordResetToken.create({
			data: {
				id: tokenId,
				userId,
				expiresAt: new Date(Date.now() + 1000 * 60 * 15)
			}
		});
	});

	return tokenId;
}

export async function verifyPasswordResetToken(
	tokenId: string
): Promise<{ success: boolean; message?: string; userId?: string }> {
	const resetToken = await prisma.passwordResetToken.findUnique({
		where: {
			id: tokenId
		}
	});

	if (!resetToken || resetToken.id !== tokenId) {
		return {
			success: false,
			message: 'Password reset token is invalid, please request a new one'
		};
	}

	if (resetToken.expiresAt < new Date()) {
		return {
			success: false,
			message: 'Password reset token has expired, please request a new one'
		};
	}

	return {
		success: true,
		userId: resetToken.userId
	};
}

export async function isSamePassword(userId: string, password: string): Promise<boolean> {
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	if (!user) {
		return false;
	}

	return compare(password, user.passwordHash);
}

export function sendPasswordResetEmail(email: string, token: string) {}
