import { useEffect } from 'react';
import { styled } from '@mui/system';
import { useInView } from 'react-intersection-observer';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import EmptyPlaylist from './EmptyPlaylist';

const Library = () => {
    // 무한 스크롤: 스크롤이 하단에 도달하면 자동으로 다음 페이지 로드
    const { ref, inView } = useInView();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
    const { data: user } = useGetCurrentUserProfile();

    // 스크롤이 하단 감지 영역에 도달하고, 다음 페이지가 있고, 로딩 중이 아닐 때 다음 페이지 가져오기
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView]);

    // 로그인하지 않은 경우 빈 플레이리스트 화면 표시
    if (!user) {
        return <EmptyPlaylist />;
    }

    return (
        <Container>
            {/* 플레이리스트가 없으면 빈 화면 표시 */}
            {!data || data?.pages[0].total === 0 ? (
                <EmptyPlaylist />
            ) : (
                <Playlists>
                    {/* 무한 스크롤로 가져온 모든 페이지의 플레이리스트 렌더링 */}
                    {data?.pages.map((page) =>
                        page.items.map((playlist) => (
                            <li key={playlist.id}>
                                <Playlist>
                                    {/* 플레이리스트 이미지가 있으면 표시, 없으면 아이콘 표시 */}
                                    {playlist.images ? (
                                        <PlaylistImage src={playlist.images[0].url} alt='' />
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
                    {/* 무한 스크롤 감지 영역: 이 div가 화면에 보이면 다음 페이지 로드 */}
                    <div ref={ref}>
                        {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
                    </div>
                </Playlists>
            )}
        </Container>
    );
};

export default Library;

// 스크롤 가능한 컨테이너: 스크롤바 숨김 처리
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
