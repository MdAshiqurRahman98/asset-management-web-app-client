import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAsset = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: assets = [], refetch } = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/assets?email=${user.email}`);
            return res.data;
        }
    })

    return [assets, refetch];
};

export default useAsset;