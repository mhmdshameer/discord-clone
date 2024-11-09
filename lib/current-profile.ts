import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const currentProfile = async () => {
  const {userId} = await auth();
  if (!userId) return null;

  const profile = await prisma.profile.findUnique({
    where: {
        userId: userId
    }
  })
    return profile;
};
