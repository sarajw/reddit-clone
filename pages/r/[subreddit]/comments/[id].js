import prisma from 'lib/prisma'
import { getPost, getSubreddit } from 'lib/data.js'
import Link from 'next/link'
import Image from 'next/image'
import throbber from 'public/bouncing-ball.svg'
import timeago from 'lib/timeago'
import NewComment from 'components/NewComment'
import { useSession } from 'next-auth/react'
import Comments from 'components/Comments'

export default function Post({ subreddit, post }) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (loading) {
    return(
      <div className="w-full h-screen flex place-content-center place-items-center">
        <Image src={throbber} alt="loading animation" className="block dark:invert" width="24" height="24" />
      </div>
    )
  }

  if (!post) return <p className='text-center p-5'>Post does not exist 😞</p>

  return (
    <>
    <header className='h-12 flex gap-5 pt-3 px-5 pb-2'>
      <Link href={`/`}>
        <a className='underline'>Home</a>
      </Link>
      <Link href={`/r/${subreddit.name}`}>
        <a className='text-center underline'>/r/{subreddit.name}</a>
      </Link>
      <p className='ml-4 text-left grow'>{subreddit.description}</p>
    </header>

      <div className='flex flex-col border p-5 mx-20 my-10'>
        <div className='flex flex-shrink-0 pb-0 '>
              Posted by {post.author.name}{' '}
              <p className='mx-2 underline'>
                {timeago.format(new Date(post.createdAt))}
              </p>
        </div>
        <div className='mt-1'>
          <a className='flex-shrink text-2xl font-bold width-auto'>
            {post.title}
          </a>
          <p className='flex-shrink text-base font-normal width-auto mt-2'>
            {post.content}
          </p>
        </div>
        {session ? (
          <NewComment post={post} />
        ) : (
          <p className='mt-5'>
            <Link href='/api/auth/signin'>
              <a className='mr-1 underline' >
                Login
              </a>
            </Link>
            to add a comment
          </p>
        )}
        <Comments comments={post.comments} />
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const subreddit = await getSubreddit(params.subreddit, prisma)
	let post = await getPost(parseInt(params.id), prisma)
  post = JSON.parse(JSON.stringify(post))

  return {
    props: {
      subreddit,
      post,
    },
  }
}