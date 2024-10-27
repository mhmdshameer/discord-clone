import { currentProfile } from "@/lib/current-profile";
import prisma from "@/lib/db";
import { redirect } from "next/dist/server/api-utils";
import { NavigationAction } from "./navigation-action";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[1E1F22] py-3">
      <NavigationAction/>
    </div>
  );
};
