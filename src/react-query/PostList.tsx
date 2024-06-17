import usePosts from "../hooks/usePosts";
import React, { useState } from "react";

const PostList = () => {
    const [userId, setUserId] = useState<number>();
    const pageSize = 10;
    const [page, setPage] = useState(1);

    // filter posts by selected user and current page number from the dropdown menu
    const { data: posts, error, isLoading, fetchNextPage, isFetchingNextPage } = usePosts({
            userId,
            page,
            pageSize
        }
    );

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>{error.message}</p>;

    return (
        <>
            <select name="user" id="user" className="form-select mb-3"
                    onChange={(event) => setUserId(parseInt(event.target.value))}
                    value={userId}
            >
                <option value="">Select a user</option>
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
            </select>
            <ul className="list-group">
                {/* pages property contains the data for all pages */}
                {posts?.pages.map((page, index) => (
                    <React.Fragment key={index}>
                        {page.map((post) => (
                            <li key={post.id} className="list-group-item">
                                {post.title}
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
            <div className="my-3">
                <button className="btn btn-primary"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}> {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </button>
            </div>
        </>
    );
};

export default PostList;
