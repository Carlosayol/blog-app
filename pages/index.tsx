import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Loader from '../components/Loader'
import { firestore, fromMillis, postToJson } from '../lib/firebase';
import { useState } from 'react';
import PostFeed from '../components/PostFeed';

const LIMIT = 1;

export const getServerSideProps = async (context) => {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt','desc')
    .limit(LIMIT)

  const posts = (await postsQuery.get()).docs.map(postToJson)
  
  return {
    props: { posts }
  }
}

const Home = ({posts}) => {
  const [localPosts, setLocalPosts] = useState(posts)
  const [loading, setLoading] = useState(false)
  const [postsEnd, setPostsEnd] = useState(false)

  const getMorePosts = async () => {
    setLoading(true)
    const last = localPosts[localPosts.lenght - 1]
    
    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
    
    // pagination
    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt','desc')
      .startAfter(cursor)
      .limit(LIMIT)
    
    const posts = (await query.get()).docs.map((doc) => doc.data())
    setLocalPosts(localPosts.concat(posts))
    setLoading(false)

    if (posts.length < LIMIT) {
      setPostsEnd(true)
    }
  }

  return (
    <div className={styles.container}>
      <PostFeed posts={localPosts} admin={false} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load Posts</button>}
      
      <Loader show={loading} />

      {postsEnd && 'This is the end of the posts.'}
    </div>
  )
}

export default Home;