import timeago from 'lib/timeago'
import Link from 'next/link'

export default function Post({ post }) {
  return (
    <div className='flex flex-col gap-4 mb-4 border p-10 mx-20 my-10'>
      <p>
        <Link href={`/r/${post.subredditName}`}>
          <a className='mr-2 underline'>/r/{post.subredditName}</a>
        </Link>
        <br></br>Posted by {post.author.name}{'  '}
        <Link href={`/r/${post.subredditName}/comments/${post.id}`}>
          <a className='underline'>
            {timeago.format(new Date(post.createdAt))}
          </a>
        </Link>
      </p>
      <p>
        <Link href={`/r/${post.subredditName}/comments/${post.id}`}>
          <a className='text-2xl font-semibold'>          
            {post.title}
          </a>
        </Link>
      </p>
      <p>
        {post.content}
      </p>
    </div>
  )
}