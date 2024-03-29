import Link from "next/link";

const PostFeed = ({ posts, admin }) => {
  return posts && posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />)
};

export default PostFeed;

const PostItem = ({ post, admin }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length
  const minutesToRead = (wordCount / 100 + 1).toFixed(0)

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>
      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span>💗 {post.heartCount} Hearts</span>
      </footer>
    </div>
  )
}
