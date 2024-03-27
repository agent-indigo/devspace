import {readdirSync, readFileSync, mkdirSync, writeFile} from 'fs'
import {join} from 'path'
import matter from 'gray-matter'
const files = readdirSync(join('posts'))
const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const MarkdownWithMeta = readFileSync(join('posts', filename), 'utf-8')
    const {data: frontMatter} = matter(MarkdownWithMeta)
    return {frontMatter, slug}
})
try {
    readdirSync('cache')
} catch (error) {
    mkdirSync('cache')
}
writeFile('cache/posts.json', JSON.stringify(posts), error => {
    error ? console.error(error) : console.log('Posts successfully cached.')
})