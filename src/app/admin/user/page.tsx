import { userColumns } from '@/components/table/columns';
import DataTable from '@/components/table/data-table';
import { getSession } from '@/lib/action/auth';
import { getAllUsersAction } from '@/lib/action/user';
import { sanitizeSession } from '@/lib/utils';

const AdminUserPage = async () => {
  const session = await getSession();

  const safeSession = sanitizeSession(session);

  const data = await getAllUsersAction(session);

  return (
    <DataTable
      columns={userColumns}
      type="user"
      filter="name"
      session={safeSession}
      data={data.data.users as User[]}
    />
  );
};

export default AdminUserPage;
