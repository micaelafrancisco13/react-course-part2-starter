import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostQuery {
    userId: number | undefined;
    page: number;
    pageSize: number;
}

const usePosts = (query: PostQuery) => {
    const { userId, page, pageSize } = query;

    return useQuery({
        queryKey: ['users', query, 'posts'],
        // anytime our 'query' changes, react query will fetch the posts from the backend
        queryFn: () => axios
            .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    // userId, // comment out for now as jsonplaceholder does not support this
                    _start: (page - 1) * pageSize,
                    _limit: pageSize
                }
                // page 1: 0 to 9,
                // page 2: 10 to 19,
            })
            .then((res) => res.data),
        staleTime: (1 * 60) * 1000, // 60 seconds
        placeholderData: (previous) => previous,
        // - when navigating to the next page, the page jumps from the bottom to up, using this
        //   prevents this behaviour
        // - this keeps the data on the current page while waiting for the new data
    });
};

export default usePosts;