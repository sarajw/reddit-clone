import Head from 'next/head'
import { getPosts } from 'lib/data.js'
import prisma from 'lib/prisma'
import Posts from 'components/Posts'
import Link from 'next/link'
import Image from 'next/image'
import throbber from 'public/bouncing-ball.svg'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

/*
const Post = ({ post }) => {
  return (
    <div className='flex flex-col border border-3 mx-20 my-10'>
    <div className='flex flex-shrink-0 pb-0 '>
          /r/{post.subredditName} Posted by {post.author.name}{' '}
          {timeago.format(new Date(post.createdAt))}
    </div>
    <div className='mt-5'>
      <p className='flex-shrink text-2xl font-bold color-primary width-auto'>          
        {post.title}
      </p>
      <p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
        {post.content}
      </p>
    </div>
    </div>
  )
} */

export default function Home({ posts }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (loading) {
    return(
      <div className="w-full h-screen flex place-content-center place-items-center">
        <Image src={throbber} alt="loading animation" className="block dark:invert" width="24" height="24" />
      </div>
    )
  }

  if (session && !session.user.name) {
    router.push('/setup')
  }

  return (
    <div>
      <Head>
        <title>Reddit Clone</title>
        <meta name='description' content='A great social network!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='flex justify-between py-3 px-5'>
        <p>Reddit clone</p>
        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
          <a className='border px-4 font-bold rounded-full mb-1'>
          {session ? 'logout' : 'login'}
          </a>
        </Link>
      </header>
      <Posts posts={posts} />
    </div>
  )
}

export async function getServerSideProps() {
  let posts = await getPosts(prisma)
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      posts: posts,
    },
  }
}