import queryString from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-providers";

interface ChatQueryProps {
  queryKey: string,
  apiUrl: string,
  paramKey: "channelId" | "conversationId",
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue
}:ChatQueryProps) =>{
  const {isConnected} = useSocket();

  const fetchMessages = async ({pageParam = undefined}) => {
    const url = queryString.stringifyUrl({
      url: apiUrl,
      query:{
        cursor: pageParam,
        [paramKey]: paramValue,
      }
    },{skipNull: true});

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error fetching messages: ${res.statusText}`);
    }
    return res.json();
  };

  const{
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval:isConnected? false : 1000,
    initialPageParam: undefined, 
  })
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
};
}