import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import CategoryList from '@/components/CategoryList'
import Layout from "@/components/Layout"
import Post from '@/components/Post'
import sortByDate from '@/utilities/sortByDate.mjs'
import getPosts from '@/utilities/getPosts.mjs'
const Category = ({posts, categoryName, categories}) => {
  return (
    <Layout title={`${categoryName} | DevSpace`}>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className='text-5xl border-b-4 p-5 font-bold' >Posts in {categoryName}</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts && posts.map((post, index) => <Post key={index} post={post}/>)}
          </div>
          <div className="w-1/4">
            <CategoryList categories={categories}/>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Category
export const getStaticPaths = async () => {
    const files = fs.readdirSync(path.join('posts'))
    const catgeories = files.map(filename => {
        const MarkdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
        const {data:frontMatter} = matter(MarkdownWithMeta)
        return frontMatter.category.toLowerCase()
    })
    const paths = catgeories.map(category => ({params: {category_name: category}}))
    return{paths, fallback: false}
}
export const getStaticProps = async ({params: {category_name}}) => {
  const posts = getPosts()
  const categories = posts.map(post => {post.frontMatter.category})
  const uniqueCategories = [...new Set(categories)]
  const postsInCategory = posts.filter(post => post.frontMatter.category.toLowerCase() === category_name)
  return {
    props: {
      posts: postsInCategory.sort(sortByDate),
      categoryName: category_name,
      categories: uniqueCategories
    }
  }
}