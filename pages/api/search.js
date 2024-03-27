import {readdirSync, readFileSync} from 'fs'
import {join} from 'path'
import matter from 'gray-matter'
const search = (request, response) => {
    const MODE = process.env.NODE_ENV || 'production'
    let posts
    if(MODE === 'production') {
        posts = readFileSync('../../cache/posts.json')
    } else {
        const files = readdirSync(join('posts'))
        posts = files.map(filename => {
            const slug = filename.replace('.md', '')
            const MarkdownWithMeta = readFileSync(join('posts', filename), 'utf-8')
            const {data:frontMatter} = matter(MarkdownWithMeta)
            return {frontMatter, slug}
        })
    }
    const results = posts.filter(({frontMatter:{title, excerpt, category}}) =>
        title.toLowerCase().indexOf(request.query.q) != -1 ||
        excerpt.toLowerCase().indexOf(request.query.q) != -1 ||
        category.toLowerCase().indexOf(request.query.q) != -1)
    response.status(200).json(JSON.stringify({results}))
}
export default search