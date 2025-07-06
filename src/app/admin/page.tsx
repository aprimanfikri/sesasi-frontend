import { permissionColumns } from '@/components/table/columns';
import DataTable from '@/components/table/data-table';
import { getSession } from '@/lib/action/auth';
import { getAllPermissionsAction } from '@/lib/action/permission';
import { sanitizeSession } from '@/lib/utils';

const AdminPage = async () => {
  const session = await getSession();

  const safeSession = sanitizeSession(session);

  const data = await getAllPermissionsAction(session);

  return (
    <DataTable
      columns={permissionColumns}
      type="permission"
      filter="title"
      session={safeSession}
      data={data.data.permissions as Permission[]}
    />
  );
};

export default AdminPage;
