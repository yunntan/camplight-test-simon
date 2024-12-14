"use server";

import { TUserFormSchema } from "@/components/forms/UserForm.client";
import { prisma } from "@/db/prismaClient";
import { User } from "@prisma/client";

export async function updateUser(
	updatedUserData: TUserFormSchema,
	userId: User["id"]
) {
	const existingUserEmail = await prisma.user.findFirst({
		where: {
			email: updatedUserData.email,
		},
	});

	if (existingUserEmail?.email && existingUserEmail.id !== userId) {
		throw new Error(
			`Email ${updatedUserData.email} is already in database.`
		);
	}

	return await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			...updatedUserData,
		},
	});
}
