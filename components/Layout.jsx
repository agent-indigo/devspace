import Head from 'next/head'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import {FaSearch} from 'react-icons/fa'
import Post from './Post'
const Layout = ({title, keywords, description, children}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    const getResults = async () => {
      if(searchTerm === '') {
        setSearchResults([])
      } else {
        const response = await fetch(`/api/search?q=${searchTerm}`)
        const {results} = await response.json()
        setSearchResults(results)
      }
    }
    getResults()
  }, [searchTerm])
  return (
    <>
      <Head>
        <title>{`${title} | DevSpace`}</title>
        <meta name='keywords' content={keywords}/>
        <meta name='description' content={description}/>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <header className="bg-gray-900 text-gray-100 shadow w-full">
        <div className="container mx-auto flex p-5 flex-col md:flex-row items-center">
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
          <form className="md:w-2/5 md:flex md:justify-end md:items-center">
            <input
              type="search"
              name="search"
              id="search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-72"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              placeholder="Search Posts..."
            />
            <FaSearch className="absolute top-0 right-0 text-black mt-3 mr-4"/>
          </form>
        </div>
      </header>
      <main className="container mx-auto my-7">
        {searchResults.length > 0 && (
          <div className="absolute top-20 right-0 md:right-10 z-10 border-4 border-gray-500 bg-white text-black w-full md:w-6/12 rounded-2xl">
            <div className="p-10">
              <h2 className="text-3xl mb-3">
                {searchResults.length} results:
              </h2>
              {searchResults.map((result, index) => (
                <Post key={index} post={result}/>
              ))}
            </div>
          </div>
        )}
        {children}
      </main>
    </>
  )
}
Layout.defaultProps = {
  title: 'DevSpace',
  keywords: 'development, coding, programming',
  description: 'Daily news and ideas for developers.'
}
export default Layout