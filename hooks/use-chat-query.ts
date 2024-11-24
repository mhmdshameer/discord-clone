import { useSocket } from "@/components/providers/socket-providers";
import { useInfiniteQuery, QueryKey } from "@tanstack/react-query";
import queryString from "query-string";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

interface PaginatedMessages {
  messages: Message[];
  nextCursor?: string | null;
}

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({
    pageParam,
  }: {
    queryKey: QueryKey;
    pageParam?: string | null;
  }) => {
    const url = queryString.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true }
    );

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch messages");
    }

    return res.json(); // API response
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<PaginatedMessages, Error>({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
      refetchInterval: isConnected ? false : 1000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
