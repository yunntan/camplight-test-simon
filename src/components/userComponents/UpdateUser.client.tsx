"use client";

import { User } from "@prisma/client";
import React from "react";
import { TUserFormSchema, UserForm } from "../forms/UserForm.client";
import { updateUser } from "@/app/action/userActions/updateUser";
import { Button } from "../ui/button";
import Link from "next/link";

type UpdateUserProps = {
	user: User;
};

const UpdateUser = ({ user }: UpdateUserProps) => {
	const { id, ...userData } = user;

	const onSubmitUpdateUser = async (d: TUserFormSchema) => {
		await updateUser(d, id);
	};

	return (
		<div>
			<div>
				<h1 className="text-xl">Update user: {userData.name}</h1>
			</div>
			<UserForm
				defaultValues={userData}
				onSubmitForm={onSubmitUpdateUser}
			/>
		</div>
	);
};

export { UpdateUser };
