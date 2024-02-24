import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import sortByDate from '@/utilities/sortByDate.js'
const getPosts = () => {
    const files = fs.readdirSync(path.join('posts'))
    const posts = files.map(filename => {
      const slug = filename.replace('.md', '')
      const MarkdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
      const {data:frontMatter} = matter(MarkdownWithMeta)
      return {slug, frontMatter}
    })
    return posts.sort(sortByDate)
}
export default getPosts