export default function Utils() {
  const tasks = [
    { task: 'generate_users', description: 'Generate random users' },
    { task: 'generate_subreddits', description: 'Generate random subreddits' },
    { task: 'add_fake_content', description: 'Add fake content'},
    { task: 'clean_database', description: 'Clean the database'},
  ]

  const Button = ({ task }) => (
    <button
      className='border px-8 py-2 font-bold rounded-full w-fit'
      onClick={async () => {
        await fetch('/api/utils', {
          body: JSON.stringify({
            task: task.task,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
      }}
    >
      {task.description}
    </button>
  )

  return (
    <div className='my-10 mx-20 flex flex-col gap-10'>
      <h2 className='text-xl'>Utils</h2>

			{tasks.map((task, index) => (
        <Button key={index} task={task} />
      ))}

    </div>
  )
}