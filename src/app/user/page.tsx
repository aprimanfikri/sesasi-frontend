import { userPermissionColumns } from '@/components/table/columns';
import DataTable from '@/components/table/data-table';
import { getSession } from '@/lib/action/auth';
import { getAllUserPermissionsAction } from '@/lib/action/permission';
import { sanitizeSession } from '@/lib/utils';

const UserPage = async () => {
  const session = await getSession();

  const safeSession = sanitizeSession(session);

  const data = await getAllUserPermissionsAction(session);

  return (
    <DataTable
      columns={userPermissionColumns}
      type="permission"
      filter="title"
      session={safeSession}
      data={data.data.permissions as Permission[]}
    />
  );
};

export default UserPage;
