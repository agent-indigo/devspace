import fs from 'fs'
import path from 'path'
import 'dotenv/config'
import CategoryList from '@/components/CategoryList'
import Layout from "@/components/Layout"
import Post from '@/components/Post'
import Pagination from '@/components/Pagination'
import getPosts from '@/utilities/getPosts.mjs'
const ResultsPage = ({posts, pageQty, currentPage, categories}) => {
  return (
    <Layout title='Blog | DevSpace'>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className='text-5xl border-b-4 p-5 font-bold' >All Posts</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts && posts.map((post, index) => <Post key={index} post={post}/>)}
          </div>
          <Pagination currentPage={currentPage} pageQty={pageQty}/>
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories}/>
        </div>
      </div>
    </Layout>
  )
}
export default ResultsPage
export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))
  const pageQty = Math.ceil(files.length / process.env.POSTS_PER_PAGE)
  let paths = []
  for(let i = 1; i <= pageQty; i++) paths.push({params: {page_index: i.toString()}})
  return {paths, fallback: false}
}
export const getStaticProps = async ({params}) => {
  const files = fs.readdirSync(path.join('posts'))
  const page = parseInt(params && params.page_index || 1)
  const pageQty = Math.ceil(files.length / process.env.POSTS_PER_PAGE)
  const pageIndex = page - 1
  const posts = getPosts()
  const orderedPosts = posts.slice(pageIndex * process.env.POSTS_PER_PAGE, (pageIndex + 1) * process.env.POSTS_PER_PAGE)
  const categories = posts.map(post => {post.frontMatter.category})
  const uniqueCategories = [...new Set(categories)]
  return {props: {posts: orderedPosts, pageQty, currentPage: page, categories: uniqueCategories}}
}