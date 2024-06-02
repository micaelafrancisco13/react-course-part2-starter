import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const usePosts = (userId: number | undefined) => {
    const fetchPosts = () => axios
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
            params: {
                userId
            }
        })
        .then((res) => res.data)

    return useQuery({
        // similar to structuring a backend API (e.g., api/users/13/posts)
        // as we get from left to right, the data gets more specific
        // userId acts like a dependency of useEffect
        // go to line 13
        queryKey: userId ? ['users', userId, 'posts'] : ['posts'],
        queryFn: fetchPosts,
        staleTime: (1 * 60) * 1000 // 60 seconds
    });

    // cached would be
    // ["posts"]
    // ["users, 1, "posts]

    // if any of the user id is already selected, once you select it again,
    // you'll no longer see a loading indicator because the data is coming from the cache
};

export default usePosts;