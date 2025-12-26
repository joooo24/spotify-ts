import axios from "axios";
import { SPORTY_BASE_URI } from "../configs/commonConfig";
import { GetNewReleasesResponse } from "../models/album";

export const getNewReleases = async (clientCredentialToken: string): Promise<GetNewReleasesResponse> => {
    try {
        const response = await axios.get(`${SPORTY_BASE_URI}/browse/new-releases?limit=6`, {
            headers: {
                Authorization: `Bearer ${clientCredentialToken}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch new releases");
    }
};
