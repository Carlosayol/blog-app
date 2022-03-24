import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserWithUsername, postToJson } from "../../lib/firebase";

const getServerSideProps = async ({ query }) => {
  const { username } = query

  const userDoc = await getUserWithUsername(username)

  let user = null
  let posts = null

  if (userDoc) {
    user = userDoc.data()
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt','desc')
      .limit(5)
    
    posts = (await postsQuery.get()).docs.map(postToJson)
  }
  
  return {
    props: { user, posts }
  }
}

const UserProfilePage = ({ user, posts }) => {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={true} />
    </main>
  )
};

export default UserProfilePage;
