import React from "react";
import { useParams } from "react-router";
import { Box, Typography, styled, type BoxProps } from "@mui/material";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import LoadingSpinners from "../../common/components/LoadingSpinners/LoadingSpinners";
import ErrorMessage from "../../common/components/ErrorMessage";

const PlaylistDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const playlistId = id ?? "";
    const { data: playlist, isLoading, error } = useGetPlaylist({ playlist_id: playlistId });

    if (isLoading) {
        return <LoadingSpinners />;
    }

    if (error) {
        return <ErrorMessage errorMessage="플레이리스트를 불러올 수 없습니다." />;
    }

    if (!playlist) {
        return <ErrorMessage errorMessage="플레이리스트를 찾을 수 없습니다." />;
    }

    return (
        <PlaylistContainer>
            {playlist.images?.[0]?.url ? (
                <PlaylistImage component="img" src={playlist.images[0].url} alt={playlist.name || "Playlist"} />
            ) : (
                <PlaylistImagePlaceholder>
                    <Typography variant="h2">🎵</Typography>
                </PlaylistImagePlaceholder>
            )}

            <PlaylistTextBox>
                <PlaylistName>{playlist.name}</PlaylistName>
                <PlaylistOwner>{playlist.owner?.display_name}</PlaylistOwner>
                <PlaylistInfoText>
                    총 {playlist.tracks?.total || 0}곡{playlist.type ? `ㆍ${playlist.type.toUpperCase()}` : ""}
                </PlaylistInfoText>
            </PlaylistTextBox>
        </PlaylistContainer>
    );
};

export default PlaylistDetailPage;

const PlaylistContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    gap: "2rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "1rem",
    padding: "2rem",
    [theme.breakpoints.down("md")]: {
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
    },
}));

const PlaylistImage = styled(Box)<BoxProps<"img">>({
    width: "16.875rem",
    borderRadius: "0.625rem",
});

const PlaylistImagePlaceholder = styled(Box)(({ theme }) => ({
    width: "16.875rem",
    height: "16.875rem",
    borderRadius: "0.625rem",
    backgroundColor: theme.palette.grey[400],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.grey[700],
}));

const PlaylistTextBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    [theme.breakpoints.down("md")]: {
        justifyContent: "center",
        alignItems: "center",
    },
}));

const PlaylistName = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "2rem",
    fontWeight: "500",
}));

const PlaylistOwner = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    fontSize: "1rem",
    fontWeight: "500",
}));

const PlaylistInfoText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "0.75rem",
    fontWeight: "400",
}));
