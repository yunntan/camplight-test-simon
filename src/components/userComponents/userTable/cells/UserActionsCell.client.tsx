import { User } from '@prisma/client/edge';
import { CellContext } from '@tanstack/react-table';
import Link from 'next/link';
import { TbEdit } from 'react-icons/tb';
import DeleteUserButton from '../../DeleteUserButton.client';

const UserActionsCell = ({
  row,
  table: {
    options: { meta },
  },
}: CellContext<User, unknown>) => {
  const user = row.original;

  return (
    <div className="flex items-center gap-4">
      {/* Edit */}

      <Link href={`/user/${user.id}`}>
        <TbEdit className="size-6" />
      </Link>

      <DeleteUserButton
        user={user}
        onUserDeleted={() => {
          meta?.removeRow && meta.removeRow(row.index);
        }}
      />
    </div>
  );
};

export { UserActionsCell };
