import Head from "next/head"
import Link from "next/link"
const Layout = ({ title, keywords, description, children }) => {
  return (
    <>
      <Head>
        <title>{`${title} | DevSpace`}</title>
        <meta name='keywords' content={keywords}/>
        <meta name='description' content={description}/>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <header className="bg-gray-900 text-gray-100 shadow w-full">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href='/' className="flex md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                  src='/images/logo.png'
                  width={40}
                  height={40}
                  alt='logo'
              />
              <span className="ml-3 text-xl">DevSpace</span>
          </Link>
          <nav className="flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto">
              <Link href='/blog' className="mx-5 cursor-pointer uppercase hover:text-indigo-300">Blog</Link>
              <Link href='/about' className="mx-5 cursor-pointer uppercase hover:text-indigo-300">About</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto my-7">{children}</main>
    </>
  )
}
Layout.defaultProps = {
    title: 'DevSpace',
    keywords: 'development, coding, programming',
    description: 'Daily news and ideas for developers.'
}
export default Layout