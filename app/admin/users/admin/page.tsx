import { getUsers } from "@/app/admin/users/actions";
import { UserTable } from "@/components/modules/admin/users/user-table";
import { columns } from "@/components/modules/admin/users/user-columns";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
    const { data: users } = await getUsers("admin");

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Admin Management</h1>
            </div>
            <UserTable columns={columns} data={users || []} />
        </div>
    );
}
