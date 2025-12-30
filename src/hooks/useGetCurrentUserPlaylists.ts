import { useInfiniteQuery } from "@tanstack/react-query";
import type { GetCurrentUserPlaylistRequest } from "../models/playlist";
import { getCurrentUserPlaylists } from "../apis/playlistApi";

const useGetCurrentUserPlaylists = ({ limit }: GetCurrentUserPlaylistRequest) => {
    return useInfiniteQuery({
        queryKey: ["current-user-playlists"],
        // pageParam: 현재 페이지의 offset 값 (0부터 시작)
        queryFn: ({ pageParam = 0 }) => {
            return getCurrentUserPlaylists({ limit, offset: pageParam });
        },
        initialPageParam: 0,
        // 다음 페이지가 있는지 확인하고, 있으면 다음 offset 반환
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                const nextOffset = url.searchParams.get("offset");
                return nextOffset ? parseInt(nextOffset) : undefined;
            }
            return undefined;
        },
    });
};

export default useGetCurrentUserPlaylists;
