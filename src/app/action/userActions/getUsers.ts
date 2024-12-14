'use server';

import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(
  page: number,
  pageSize: number,
  nameSearch?: string,
) {
  // Construct the filtering criteria for 'name' field if 'nameSearch' is provided
  const where: Prisma.UserFindManyArgs['where'] = nameSearch
    ? {
        name: {
          contains: nameSearch,
        },
      }
    : {};

  try {
    // Fetch the users with pagination and optional filtering
    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // Get the total count of users (filtered if 'nameSearch' is applied)
    const total = await prisma.user.count({
      where,
    });

    return {
      users, // The list of users for the current page
      total, // The total number of users matching the filter (for pagination)
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}
