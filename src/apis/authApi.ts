import axios from "axios";
import { ClientCredentialTokenResponse } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";

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
        throw new Error("Failed to fetch client credential token");
    }
};
