import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import prisma from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps{
   params:{
    serverId: string,
    channelId: string
   }
}

const ChannelIdPage = async ({params}: ChannelIdPageProps) => {
    const profile = await currentProfile();
    const {serverId, channelId} = await params;

    if(!profile){
        return <RedirectToSignIn/>;
    }

    const channel = await prisma.channel.findUnique({
        where:{
            id: channelId,
        },
    });

    const member = await prisma.member.findFirst({
        where:{
            serverId: serverId,
            profileId: profile.id,
        },
    });

    if(!channel || !member){
        redirect("/")
    }
    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
            name={channel.name}
            serverId={channel.serverId}
            type= "channel"
            />
            <div className="flex-1">Future Messages</div>
            <ChatInput 
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                    channelId: channel.id,
                    serverId: channel.serverId
                }}
            />
        </div>
     );
}
 
export default ChannelIdPage;