import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const usePosts = () => {
    const fetchPosts = () => axios
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.data)

    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: (1 * 60) * 1000 // 60 seconds
    }); // returns a query object with properties like data, error, isLoading, and so on...
};

export default usePosts;