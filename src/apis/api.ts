import axios from 'axios';

const SPOTIFY_API_BASE_URL = process.env.REACT_APP_SPOTIFY_API_BASE_URL;

// Spotify API 호출을 위한 axios 인스턴스 생성
export const spotifyApi = axios.create({
    baseURL: SPOTIFY_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 인증 토큰을 헤더에 추가하는 인터셉터
spotifyApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('spotify_access_token'); // 또는 다른 방식으로 토큰 관리
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});