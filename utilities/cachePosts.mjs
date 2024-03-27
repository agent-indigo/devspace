import {readdirSync, mkdirSync, writeFile} from 'fs'
import parsePosts from './parsePosts.mjs'
const posts = parsePosts()
try {
    readdirSync('cache')
} catch (error) {
    mkdirSync('cache')
}
writeFile('cache/posts.json', JSON.stringify(posts), error => {
    error ? console.error(error) : console.log('Posts successfully cached.')
})