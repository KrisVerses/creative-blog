'use client';

import { allPosts } from "contentlayer/generated";
import Tag from "./Tag";

const TagList = () => {
    const tags = allPosts.map((post) => post.tags).flat();

    return (
        <div className="flex flex-row gap-2">
            {tags.map(tag => <Tag tag={tag} />)}
        </div>
    )
}

export default TagList;