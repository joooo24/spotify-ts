import type { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse } from "../models/playlist";
import api from "../utils/api";

// 현재 로그인한 사용자의 플레이리스트 목록 가져오기
export const getCurrentUserPlaylists = async ({
    limit,  // 한 번에 가져올 플레이리스트 개수
    offset, // 시작 위치 (페이지네이션용)
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
    try {
        const response = await api.get("/me/playlists", {
            params: { limit, offset },
        });
        return response.data;
    } catch (error) {
        throw new Error("fail to fetch current user playlists");
    }
};
