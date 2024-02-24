import fs from 'fs'
import path from 'path'
import 'dotenv/config'
import CategoryList from '@/components/CategoryList'
import pagination from '@/utilities/pagination.js'
import PaginationHeading from '@/components/PaginationHeading'
import Post from '@/components/Post'
import Pagination from '@/components/Pagination'
import getPosts from '@/utilities/getPosts.js'
const Blog = ({posts, pageQty, currentPage, categories}) => {
  return (
    <>
      <PaginationHeading title="All Posts" categories={<CategoryList categories={categories}/>}>
        {posts && posts.map((post, index) => <Post key={index} post={post}/>)}
      </PaginationHeading>
      <Pagination currentPage={currentPage} pageQty={pageQty}/>
    </>
  )
}
export default Blog
export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))
  const pageQty = Math.ceil(files.length / process.env.PAGINATION || 12)
  let paths = []
  for(let i = 1; i <= pageQty; i++) paths.push({params: {page_index: i.toString()}})
  return {paths, fallback: false}
}
export const getStaticProps = async ({ params }) => {
  const files = fs.readdirSync(path.join('posts'))
  const page = parseInt(params && params.page_index || 1)
  const pageQty = Math.ceil(files.length / process.env.PAGINATION || 12)
  const pageIndex = page - 1
  const posts = getPosts()
  const orderedPosts = posts.slice(pageIndex * process.env.PAGINATION, (pageIndex + 1) * process.env.PAGINATION)
  const categories = posts.map(post => post.frontMatter.category)
  const uniqueCategories = [...new Set(categories)]
  const paginationLinks = pagination(page, pageQty, '/blog/page')
  return {
    props: {
      posts: orderedPosts,
      pageQty,
      currentPage: page,
      categories: uniqueCategories,
      paginationLinks
    }
  }
}