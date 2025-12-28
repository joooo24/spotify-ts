import { useMutation } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import type { ExchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
    // post -> 뮤테이션 훅 사용
    return useMutation<ExchangeTokenResponse, Error, { code: string; codeVerifier: string }>({
        mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
        onSuccess: (data) => {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            // code_verifier는 사용 후 삭제
            localStorage.removeItem("code_verifier");
            window.history.replaceState({}, document.title, window.location.pathname);
        },
        onError: (error) => {
            console.error("토큰 교환 실패:", error);
            localStorage.removeItem("code_verifier");
        },
    });
};

export default useExchangeToken;
