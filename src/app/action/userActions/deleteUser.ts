"use server";

import { prisma } from "@/db/prismaClient";
import { User } from "@prisma/client";

export async function deleteUser(userId: User["id"]) {
	return await prisma.user.delete({
		where: {
			id: userId,
		},
	});
}
