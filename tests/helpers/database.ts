import { prisma } from "@/lib/prisma";

export const resetAccommodationDatabase = async () => {
  await prisma.accommodation.deleteMany();
};
