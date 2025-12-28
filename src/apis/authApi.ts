import axios from "axios";
import { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";

const encodedBase64 = (data: string): string => {
    // return Buffer.from(data).toString("base64");
    if (typeof window === "undefined") {
        // Node.js environment
        return Buffer.from(data).toString("base64");
    } else {
        // Browser environment
        return btoa(data);
    }
};

export const getClientCredentialToken = async (): Promise<ClientCredentialTokenResponse> => {
    try {
        const body = new URLSearchParams({ grant_type: "client_credentials" });

        const response = await axios.post("https://accounts.spotify.com/api/token", body, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + encodedBase64(`${CLIENT_ID}:${CLIENT_SECRET}`),
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Client Credential Token 요청 실패:", {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw new Error(`Failed to fetch client credential token: ${error.response?.status} ${error.response?.statusText}`);
        }
        throw new Error("Failed to fetch client credential token");
    }
};

export const exchangeToken = async (code: string, codeVerifier: string): Promise<ExchangeTokenResponse> => {
    try {
        const url = 'https://accounts.spotify.com/api/token';

        if (!CLIENT_ID || !REDIRECT_URI) {
            throw new Error('missing required parameters');
        }

        const body = new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: codeVerifier,
        });

        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Token exchange 실패:", {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw new Error(`Failed to exchange token: ${error.response?.status} ${error.response?.statusText}`);
        }
        throw new Error('Failed to exchange token');
    }
};
