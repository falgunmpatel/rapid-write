import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import {Input, Button, Select, RTE} from "../index"
import databaseService from '../../appwrite/database' 
import storageService from '../../appwrite/storage'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import {addPost, editPost} from '../../store/postSlice'

function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.userData)

    const submit = async(data) => {
        setLoading(true)
        if(post){
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null
            if(file){
                storageService.deleteFile(post.featuredImage)
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if(dbPost){ 
              dispatch(editPost({slug:post.$id, ...dbPost}))
              navigate(`/post/${dbPost.$id}`)
            }
        } else {
            //TODO: Brainstorm whether to check file here? WHY ??
            const file = await storageService.uploadFile(data.image[0])
  
            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId
                const dbPost = await databaseService.createPost({
                    ...data,  
                    userId: userData?.$id
                })

                if(dbPost){
                    dispatch(addPost({slug:data.slug, ...dbPost}));
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
        setLoading(false)
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value == 'string')
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title, {
                    shouldValidate: true
                }))
            }
        });

        return(() => {
            subscription.unsubscribe();
        })
    }, [watch, slugTransform, setValue])

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 md:gap-0 md:flex-row flex-wrap"
    >
      <div className="md:w-2/3 sm:px-2 text-sky-200">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="md:w-1/3 sm:px-2 text-sky-200">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full disabled:opacity-50"
          disabled={loading}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm