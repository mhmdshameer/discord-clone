import prisma from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

export const currentProfile = async (req: NextApiRequest) => {
  const {userId} = await getAuth(req);
  if (!userId) return null;

  const profile = await prisma.profile.findUnique({
    where: {
        userId
    }
  })
    return profile;
};
