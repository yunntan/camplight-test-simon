'use server';

import { prisma } from '@/db/prismaClient';
import { User } from '@prisma/client';

/**
 * Returns user profile image as a b64 string to display in the browser
 * @param userId
 * @returns
 */
export async function getUserProfileImage(userId: User['id']) {
  // Fetch image from database
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { image: true },
  });

  if (user?.image) {
    // Convert the image to a base64 string and return it
    return `data:image/png;base64,${Buffer.from(user.image.data).toString('base64')}`;
  }

  throw new Error('Image not found');
}
