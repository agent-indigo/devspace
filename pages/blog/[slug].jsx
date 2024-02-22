import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {marked} from 'marked'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import CategoryLabel from '@/components/CategoryLabel'
const page = ({frontMatter: {title, category, date, cover_image, author, author_image}, content, slug}) => {
  return (
    <Layout title={title}>
      <Link href='/blog'>Go Back</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <div className="text-5xl mb-7">{title}</div>
          <CategoryLabel>{}category</CategoryLabel>
        </div>
        <Image
          src={cover_image}
          alt=''
          className='w-full rounded'
        />
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className='flex items-center'>
            <Image
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
export default page
export const getStaticPaths = () => {
    const files = fs.readdirSync(path.join('posts'))
    const paths = files.map(filename => ({params: {slug: filename.replace('md', '')}}))
    return {paths, fallback: false}
}
export const getStaticProps = async ({params: {slug}}) => {
    const MarkdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')
    const {data:frontMatter, content} = matter(MarkdownWithMeta)
    return {props: {frontMatter, content, slug}}
}