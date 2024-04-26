import React from 'react'
// import databaseService from '../appwrite/database'
import { Container, PostForm  } from '../components/index'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function EditPost() {
    const [post, setPost] = useState(null)
    const posts = useSelector(state => state.post.posts)
    const navigate = useNavigate()
    const {slug} = useParams();

    useEffect(() => {
      if (slug) {
        // databaseService.getPost(slug).then((post) => {
        //   if (post) {
        //     setPost(post);
        //   }
        // });
        const post = posts.find((post) => post.$id === slug);
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }, [slug, navigate]);

  return post ? (
    <div className='p-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost