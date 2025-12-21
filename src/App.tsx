import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import LoadingSpinners from './common/components/LoadingSpinners/LoadingSpinners';
const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(() => import('./SearchWithKeywordPage/SearchWithKeywordPage'));
// const PlaylistPage = React.lazy(() => import('./PlaylistPage/PlaylistPage'));
const PlaylistDetailPage = React.lazy(() => import('./PlaylistDetailPage/PlaylistDetailPage'));

// 0. 사이드바 (플레이리스트, 메뉴)
// 1. 홈페이지 /
// 2. 서치 페이지 /search
// 3. 서치 결과 페이지 /search/:keyword
// 4. 플레이리스트(모바일용) /playlist
// 5. 플레이리스트 상세 페이지 /playlist/:id
function App() {
    return (
        <Suspense fallback={<LoadingSpinners />}>
            <Routes>
                <Route path="/" element={<AppLayout />} >
                    <Route index element={<HomePage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
                    {/* <Route path="playlist" element={<PlaylistPage />} /> */}
                    <Route path="playlist/:id" element={<PlaylistDetailPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
