"use client";

import {useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const createPrompt = () => {
  const [submitting, SetSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })
  const { data: session } = useSession(); // Define session
  const router = useRouter(); // Define router

  const createPrompt = async (e) => {
    e.preventDefault();
    SetSubmitting(true);

    try{
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        })
      })
      if(response.ok){
        router.push('/');
      }
    }catch(error){
      console.log(error)
    } finally{
      SetSubmitting(false);
    }
  }

  return (
    <Form
    type="Create"
    post ={post}
    setPost={setPost}
    submitting = {submitting}
    handleSubmit = {createPrompt}
    />
  )
}

export default createPrompt;