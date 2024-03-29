/* eslint-disable @next/next/no-img-element */
import {readdirSync, readFileSync} from 'fs'
import {join} from 'path'
import matter from 'gray-matter'
import {marked} from 'marked'
import Link from 'next/link'
import Layout from '@/components/Layout'
import CategoryLabel from '@/components/CategoryLabel'
const Article = ({frontMatter: {title, category, date, cover_image, author, author_image}, content}) => {
  return (
    <Layout title={title}>
      <Link href='/blog'>Go Back</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <div className="text-5xl mb-7">{title}</div>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <img
          src={cover_image}
          alt=''
          className='w-full rounded'
        />
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className='flex items-center'>
            <img
              src={author_image}
              alt=''
              className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>
        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{__html: marked(content)}} ></div>
        </div>
      </div>
    </Layout>
  )
}
export default Article
export const getStaticPaths = () => {
  const files = readdirSync(join('posts'))
  const paths = files.map(filename => ({params: {slug: filename.replace('md', '')}}))
  return {paths, fallback: false}
}
export const getStaticProps = async ({params: {slug}}) => {
  const MarkdownWithMeta = readFileSync(join('posts', slug + '.md'), 'utf-8')
  const {data:frontMatter, content} = matter(MarkdownWithMeta)
  return {props: {frontMatter, content}}
}