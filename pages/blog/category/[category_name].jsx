import {readdirSync, readFileSync} from 'fs'
import {join} from 'path'
import matter from 'gray-matter'
import {POSTS_PER_PAGE} from '@/env'
import CategoryList from '@/components/CategoryList'
import pagination from '@/utilities/pagination'
import PaginationHeading from '@/components/PaginationHeading'
import Post from '@/components/Post'
import Pagination from '@/components/Pagination'
import sortByDate from '@/utilities/sortByDate'
import getPosts from '@/utilities/getPosts'
const Category = ({posts, categoryName, categories, currentPage, pageQty}) => {
  return (
    <>
      <PaginationHeading title={`Posts in ${categoryName}`} categories={<CategoryList categories={categories}/>}>
        {posts && posts.map((post, index) => <Post key={index} post={post}/>)}
      </PaginationHeading>
      <Pagination currentPage={currentPage} pageQty={pageQty}/>
    </>
  )
}
export default Category
export const getStaticPaths = async () => {
  const files = readdirSync(join('posts'))
  const categories = files.map(filename => {
    const MarkdownWithMeta = readFileSync(join('posts', filename), 'utf-8')
    const {data: frontMatter} = matter(MarkdownWithMeta)
    return frontMatter.category.toLowerCase()
  })
  const paths = categories.map(category => ({params: {category_name: category}}))
  return {paths, fallback: false}
}
export const getStaticProps = async ({params: {category_name}}) => {
  const posts = getPosts()
  const categories = posts.map(post => post.frontMatter.category)
  const uniqueCategories = [...new Set(categories)]
  const postsInCategory = posts.filter(post => post.frontMatter.category.toLowerCase() === category_name)
  const pageQty = Math.ceil(postsInCategory.length / POSTS_PER_PAGE || 12)
  const paginationLinks = pagination(1, pageQty, `/blog/category/${category_name}`)
  return {
    props: {
      posts: postsInCategory.sort(sortByDate),
      categoryName: category_name,
      categories: uniqueCategories,
      currentPage: 1,
      pageQty: pageQty,
      paginationLinks: paginationLinks
    }
  }
}