import { deleteUser } from '@/app/action/userActions/deleteUser';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User } from '@prisma/client/edge';
import React from 'react';
import { TbTrash } from 'react-icons/tb';
import { VscWarning } from 'react-icons/vsc';

type DeleteUserButtonProps = {
  user: User;
  onUserDeleted?: () => void;
};

const DeleteUserButton = ({ user, onUserDeleted }: DeleteUserButtonProps) => {
  const [isProcessing, setIsProcessing] = React.useState(false),
    [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false),
    [deleteError, setDeleteError] = React.useState<string>();

  const triggerUserDeletion = async () => {
    setIsProcessing(true);
    setDeleteError(undefined);

    try {
      await deleteUser(user.id);
      setIsProcessing(false);
      setIsDeleteDialogOpen(false);
      onUserDeleted && onUserDeleted();
    } catch (e: any) {
      setDeleteError(e?.message || 'Something went wrong deleting user.');
    }
  };

  return (
    <AlertDialog
      open={isDeleteDialogOpen}
      onOpenChange={(v) => {
        if (!isProcessing) {
          setIsDeleteDialogOpen(v);
        }
      }}
    >
      <AlertDialogTrigger className="text-red-500 hover:text-red-500/90 disabled:text-stone-400/60">
        <TbTrash className="size-6" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you you sure want to delete user:&nbsp;
            <span>{user.name}</span> ?
          </AlertDialogTitle>
          <AlertDialogDescription asChild={true}>
            <div>
              This action cannot be undone. This will permanently delete the
              user.
              <Alert
                className={cn('mt-3', {
                  hidden: !deleteError,
                })}
                variant="destructive"
              >
                <VscWarning className="size-5" />
                <AlertTitle>Could not delete user.</AlertTitle>
                <AlertDescription className="text-xs">
                  {deleteError}
                </AlertDescription>
              </Alert>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
          <Button
            disabled={isProcessing}
            variant="destructive"
            onClick={triggerUserDeletion}
          >
            Delete user
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserButton;
