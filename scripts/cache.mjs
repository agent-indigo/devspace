import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
const cache = (() => {
    const getPosts = () => {
        const files = fs.readdirSync(path.join('posts'))
        const posts = files.map(filename => {
            const slug = filename.replace('.md', '')
            const MarkdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
            const {data:frontMatter} = matter(MarkdownWithMeta)
            return {
                frontMatter,
                slug
            }
        })
        return JSON.stringify(posts)
    }
    try {
        fs.readdirSync('../cache')
    } catch (error) {
        fs.mkdirSync('../cache')
    }
    fs.writeFile('../cache/posts.json', getPosts(), error =>{
        if(error) console.error(error)
    })
})()
export default cache