import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useProduct = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/products?email=${user.email}`);
            return res.data;
        }
    })

    return [products, refetch];
};

export default useProduct;