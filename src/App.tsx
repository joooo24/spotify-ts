import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import LoadingSpinners from './common/components/LoadingSpinners/LoadingSpinners';
import useExchangeToken from './hooks/useExchangeToken';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(() => import('./pages/SearchWithKeywordPage/SearchWithKeywordPage'));
// const PlaylistPage = React.lazy(() => import('./PlaylistPage/PlaylistPage'));
const PlaylistDetailPage = React.lazy(() => import('./pages/PlaylistDetailPage/PlaylistDetailPage'));

// 0. 사이드바 (플레이리스트, 메뉴)
// 1. 홈페이지 /
// 2. 서치 페이지 /search
// 3. 서치 결과 페이지 /search/:keyword
// 4. 플레이리스트(모바일용) /playlist
// 5. 플레이리스트 상세 페이지 /playlist/:id
function App() {
    // Spotify 로그인 콜백 처리
    // 1. URL에서 코드와 로컬 스토리지에서 코드 검증자 가져오기
    // 2. 토큰 교환 훅 사용
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('code_verifier');
    const { mutate: exchangeToken } = useExchangeToken();

    useEffect(() => {
        if (code && codeVerifier) {
            exchangeToken({ code, codeVerifier },
                {
                    onSuccess: () => {
                        window.location.href = '/';
                    },
                    onError: (error) => {
                        console.error('토큰 교환 실패:', error);
                        window.location.href = '/';
                    },
                }
            );
        }
    }, [code, codeVerifier, exchangeToken]);

    return (
        <Suspense fallback={<LoadingSpinners />}>
            <Routes>
                <Route path="/" element={<AppLayout />} >
                    <Route index element={<HomePage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
                    {/* <Route path="playlist" element={<PlaylistPage />} /> */}
                    <Route path="playlist/:id" element={<PlaylistDetailPage />} />
                    {/* Spotify 로그인 callback 처리 - AppLayout 안에 포함 */}
                    <Route path="callback" element={<HomePage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;