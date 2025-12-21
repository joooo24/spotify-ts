import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router';
import AppLayout from './layout/AppLayout';
import HomePage from './HomePage/HomePage';
import SearchPage from './SearchPage/SearchPage';
import SearchWithKeywordPage from './SearchWithKeywordPage/SearchWithKeywordPage';
import PlaylistPage from './PlaylistPage/PlaylistPage';
import PlaylistDetailPage from './PlaylistDetailPage/PlaylistDetailPage';

// 0. 사이드바 (플레이리스트, 메뉴)
// 1. 홈페이지 /
// 2. 서치 페이지 /search
// 3. 서치 결과 페이지 /search/:keyword
// 4. 플레이리스트(모바일용) /playlist
// 5. 플레이리스트 상세 페이지 /playlist/:id
function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />} >
                <Route index element={<HomePage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
                {/* <Route path="playlist" element={<PlaylistPage />} /> */}
                <Route path="playlist/:id" element={<PlaylistDetailPage />} />
            </Route>
        </Routes>
    );
}

export default App;
