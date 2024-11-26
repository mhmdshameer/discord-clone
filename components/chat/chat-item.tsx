"use client"

import { Member, Profile } from "@prisma/client";
import { UserAvatar } from "../user-avatar";

interface ChatItemProps{
    id: string;
    content: string;
    member: Member & {
        profile: Profile;
    };
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: Member;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record <string, string>;
}

export const ChatItem = ({id,content,member,timestamp,fileUrl,deleted,currentMember,isUpdated,socketUrl,socketQuery}:ChatItemProps) => {
    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={member.profile.imageUrl}/>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-semibold text-sm hover:underline cursor-pointer">
                                {member.profile.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}