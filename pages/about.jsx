/* eslint-disable react/no-unescaped-entities */
import Layout from '@/components/Layout'
const about = () => {
  return (
    <Layout title='About'>
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>
      <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
        <h3 className="text-2xl mb-5">DevSpace Blog</h3>
        <p className="mb-3">
          This is the DevSpace Blog project from Brad Traversy's 2021
          Next.js from Development to Deployment: Build a Music Event
          Website course on O'Reilly.
        </p>
        <p>
          <span className="font-bold">Version 1.0.0</span>
        </p>
      </div>
    </Layout>
  )
}
export default about