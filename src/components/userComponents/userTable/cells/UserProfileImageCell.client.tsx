import { getUserProfileImage } from '@/app/action/userActions/getUserProfileImage';
import { Spinner } from '@/components/ui/spinner';
import { User } from '@prisma/client/edge';
import { CellContext } from '@tanstack/react-table';
import React from 'react';

const UserProfileImageCell = ({ row }: CellContext<User, unknown>) => {
  const [imageSrc, setImageSrc] = React.useState<string>();
  const [isLoadingImage, setIsLoadingImage] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        // Call the server action to fetch the image source as b64
        const imageBase64 = await getUserProfileImage(row.original.id);
        setImageSrc(imageBase64); // Set the image source
      } catch (error) {
        console.error('Failed to fetch image:', error);
      } finally {
        setIsLoadingImage(false);
      }
    })();
  }, [row.original.id]);

  return (
    <div className="flex size-10 items-center justify-center overflow-hidden rounded-full">
      {isLoadingImage && <Spinner size="small" />}
      {imageSrc && <img src={imageSrc} width={40} height={40} alt="User" />}
      {!isLoadingImage && !imageSrc && (
        <div className="size-full bg-gray-200" />
      )}
    </div>
  );
};

export { UserProfileImageCell };
