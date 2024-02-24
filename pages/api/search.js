import fs from 'fs'
import path from 'path'
import 'dotenv/config'
import matter from 'gray-matter'
const search = (request, response) => {
    const DEBUG = process.env.DEBUG || 'false'
    let posts
    if(DEBUG === 'false') {
        posts = fs.readFileSync('../../cache/posts.json')
    } else {
        const files = fs.readdirSync(path.join('posts'))
        posts = files.map(filename => {
            const slug = filename.replace('.md', '')
            const MarkdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
            const {data:frontMatter} = matter(MarkdownWithMeta)
            return {
                frontMatter,
                slug
            }
        })
    }
    const results = posts.filter(({frontMatter:{title, excerpt, category}}) =>
        title.toLowerCase().indexOf(request.query.q) != -1 ||
        excerpt.toLowerCase().indexOf(request.query.q) != -1 ||
        category.toLowerCase().indexOf(request.query.q) != -1)
    response.status(200).json(JSON.stringify({results}))
}
export default search