import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/userComponents/userTable/UserTable.client";
import Link from "next/link";

export default async function Home() {
	return (
		<div>
			<div className="flex flex-wrap">
				<h1 className="text-3xl font-bold">Browse users</h1>
				<Button className="ml-auto" asChild={true} variant="link">
					<Link href="/user/new"> + Add new user</Link>
				</Button>
			</div>
			<UsersTable />
		</div>
	);
}
