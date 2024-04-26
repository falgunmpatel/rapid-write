import React, {useEffect, useState} from 'react'
// import databaseService from '../appwrite/database'
import { Container, PostCard,  } from '../components/index'
import { useSelector } from 'react-redux'

function AllPosts() {
    const postsData = useSelector(state => state.post.posts)
    const userData = useSelector(state => state.auth.userData)
    const [posts, setPosts] = useState([]);

    // const [posts, setPosts] = useState([])

    useEffect(() => {
        // databaseService.getPosts().then((posts) => {
        //     if(posts){ 
        //         setPosts(posts.documents)
        //     }
        // })
        const filteredPosts = postsData.filter((post) =>  post.userId === userData.$id)
        setPosts(filteredPosts)
    }, [postsData, userData.$id])


  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts?.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard  {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts