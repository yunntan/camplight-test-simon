import { Spinner } from '@/components/ui/spinner';
import { UpdateUser } from '@/components/userComponents/UpdateUser.client';
import { prisma } from '@/db/prismaClient';
import { User } from '@prisma/client';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const UserPageContent = async ({ userId }: { userId: User['id'] }) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    // Redirect to not found if not user found
    notFound();
  }

  return <UpdateUser user={user} />;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (isNaN(parseInt(slug))) {
    notFound();
  }

  return (
    <Suspense fallback={<Spinner size="large" />}>
      <UserPageContent userId={parseInt(slug)} />
    </Suspense>
  );
}
