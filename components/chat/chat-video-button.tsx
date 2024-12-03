"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ActionTooltip } from "../action-tooltip"
import { Video, VideoOff } from "lucide-react";
import queryString from "query-string";

export const ChatVideoButton = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const isVideo = searchParams?.get("video");

    const onClick = () => {
        const url = queryString.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo? undefined : true,
            }
        },{skipNull: true});

        router.push(url);
    }
    const Icon = isVideo ? VideoOff : Video
    const tooltipLabel = isVideo? "End video call" : "start video call"
        return (
        <ActionTooltip side="bottom" label={tooltipLabel}>
            <button onClick={onClick} className="hover:opacity-75 transition mr-4 ">
                <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400"/>
            </button>
        </ActionTooltip>
    )
}