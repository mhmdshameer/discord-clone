import { currentProfile } from "@/lib/current-profile";
import prisma from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();
  console.log("Profile:",profile)

  if (!profile) return RedirectToSignIn;

  if (!params.inviteCode) return redirect("/");

  const existingServer =  await prisma.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await prisma.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });
  if(server) {
    return redirect(`/servers/${server.id}`);
  }
  return <div>Hello Invite</div>;
};

export default InviteCodePage;
