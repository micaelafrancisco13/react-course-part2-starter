import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

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
    const { pageSize } = query;

    // replace useQuery with useInfiniteQuery
    return useInfiniteQuery({
        queryKey: ['users', query, 'posts'],
        queryFn: ({ pageParam = 1 }) => axios
            .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    // userId, // comment out for now as jsonplaceholder does not support this
                    _start: (pageParam - 1) * pageSize,
                    _limit: pageSize
                }
            })
            .then((res) => res.data),
        staleTime: 60 * 1000,
        placeholderData: (previous) => previous,
        initialPageParam: 1,
        // when "Load More" button is clicked, the function below will be called then the page
        // number will be passed as a property to the query function
        getNextPageParam: (lastPage, allPages) => {
            // allPages - every element in this array, is a Post[]
            // we should return the next page number
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        }
    });
};

export default usePosts;