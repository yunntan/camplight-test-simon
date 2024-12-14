'use server';

import { TUserFormSchema } from '@/components/forms/UserForm.client';
import { prisma } from '@/db/prismaClient';
import { getAImage } from '@/utils/aiUtils';

export async function createNewUser(newUserData: TUserFormSchema) {
  const existingUserEmail = await prisma.user.findFirst({
    where: {
      email: newUserData.email,
    },
  });

  if (existingUserEmail?.email) {
    throw new Error(`Email ${newUserData.email} is already in database.`);
  }

  let imageId = null;
  try {
    const generatedImageUrl = await getAImage(
      'A sample outline for a profile image in the style of rick and morty',
    );
    const imageFetch = await fetch(generatedImageUrl);
    const imageBuffer = await imageFetch.arrayBuffer();
    const imageDataBuffer = Buffer.from(imageBuffer);

    // Save the image data into the SQLite database using Prisma
    const newProfileImage = await prisma.image.create({
      data: {
        data: imageDataBuffer, // Store the binary data here
      },
    });
    imageId = newProfileImage.id;
  } catch (e) {
    console.log('Failed to create profile image', e);
  }

  return await prisma.user.create({
    data: {
      ...newUserData,
      imageId: imageId,
    },
  });
}
