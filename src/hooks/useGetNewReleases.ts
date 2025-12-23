import { useQuery } from "@tanstack/react-query";
import { getNewRealeases } from "../api/albumApi";

const useGetNewReleases = () => {
    return useQuery({
        queryKey: ['new-releases'],
        queryFn: async () => {
            return getNewRealeases();
        }
    });
}

export default useGetNewReleases;