import {readdirSync, readFileSync} from 'fs'
import {join} from 'path'
import matter from 'gray-matter'
const parsePosts = () => {
    const files = readdirSync(join('posts'))
    const posts = files.map(filename => {
        const slug = filename.replace('.md', '')
        const MarkdownWithMeta = readFileSync(join('posts', filename), 'utf-8')
        const {data: frontMatter} = matter(MarkdownWithMeta)
        return {frontMatter, slug}
    })
    return posts
}
export default parsePosts