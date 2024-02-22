import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Layout from "@/components/Layout"
import Post from '@/components/Post'
import sortByDate from '@/utilities/sortByDate.mjs'
const index = ({posts}) => {
  return (
    <Layout title='Blog | DevSpace'>
      <h1 className='text-5xl border-b-4 p-5 font-bold' >All Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts && posts.map((post, index) => <Post key={index} post={post}/>)}
      </div>
    </Layout>
  )
}
export default index
export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const MarkdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const {data:frontMatter} = matter(MarkdownWithMeta)
    return {slug, frontMatter}
  })
  return {props: {posts: posts.sort(sortByDate).slice(0, 6)}}
}