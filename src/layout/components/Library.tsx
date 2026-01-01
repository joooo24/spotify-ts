import { useEffect } from 'react';
import { styled } from '@mui/system';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import EmptyPlaylist from './EmptyPlaylist';

const Library = () => {
    const { ref, inView } = useInView();
    const navigate = useNavigate();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
    const { data: user } = useGetCurrentUserProfile();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handlePlaylistClick = (id: string | undefined) => {
        if (id) {
            navigate(`/playlist/${id}`);
        }
    };

    if (!user) {
        return <EmptyPlaylist />;
    }

    return (
        <Container>
            {!data || data?.pages[0].total === 0 ? (
                <EmptyPlaylist />
            ) : (
                <Playlists>
                    {data?.pages.map((page) =>
                        page.items.map((playlist) => (
                            <li key={playlist.id}>
                                <Playlist onClick={() => handlePlaylistClick(playlist.id)}>
                                    {playlist.images?.[0]?.url ? (
                                        <PlaylistImage src={playlist.images[0].url} alt={playlist.name || "Playlist"} />
                                    ) : (
                                        <ImageNotSupportedIcon sx={{ fontSize: '60px' }} />
                                    )}
                                    <PlaylistInfo>
                                        <h4>{playlist.name}</h4>
                                        <p>Playlist ﹒ {playlist.owner?.display_name}</p>
                                    </PlaylistInfo>
                                </Playlist>
                            </li>
                        ))
                    )}
                    <div ref={ref}>
                        {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
                    </div>
                </Playlists>
            )}
        </Container>
    );
};

export default Library;

const Container = styled('div')({
    flex: 1,
    overflowY: 'auto',
    minHeight: 0,
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
});

const Playlists = styled('ul')({
    listStyle: 'none',
    padding: '0',
    margin: '0',
});

const Playlist = styled('article')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    cursor: 'pointer',
    '&:hover': {
        background: theme.palette.background.default,
        borderRadius: '8px',
    },
}));

const PlaylistImage = styled('img')({
    display: 'block',
    width: '60px',
    borderRadius: '8px',
});

const PlaylistInfo = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    '& h4, p': {
        margin: '0',
    },
    '& h4': {
        color: theme.palette.primary.main,
    },
    '& p': {
        maxWidth: '167px',
        fontSize: '12px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
}));

const LoadingMessage = styled('p')(({ theme }) => ({
    padding: '8px',
    margin: '0',
    color: theme.palette.primary.main,
    fontWeight: '700',
}));
