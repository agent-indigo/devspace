import Layout from '@/components/Layout'
const NotFound = () => {
  return (
    <Layout title='Not Found'>
      <div className="flex flex-col items-center mt-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/images/logo.png'
          width={70}
          height={70}
          alt="Logo"
          className="bg-gray-800 rounded-2xl"
        />
        <h1 className="text-6xl my-5">Error 404</h1>
        <h2 className="text-4xl text-gray-400 mb-5">
          Page Not Found
        </h2>
      </div>
    </Layout>
  )
}
export default NotFound