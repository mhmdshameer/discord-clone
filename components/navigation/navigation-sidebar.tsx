import { currentProfile } from "@/lib/current-profile";
import prisma from "@/lib/db";
import { NavigationAction } from "./navigation-action";
import { redirect } from "next/navigation";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";

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
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction/>
      <Separator className="h-[1.5px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea>
        {servers.map((server)=>(
        <div key={server.id}>
          <NavigationItem
          id={server.id}
          name={server.name}
          imageUrl={server.imageUrl}
          />
        </div>
      ))}
      </ScrollArea>
    </div>
  );
};
