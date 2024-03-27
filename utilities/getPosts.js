import parsePosts from './parsePosts'
import sortByDate from './sortByDate'
const getPosts = () => {
  const posts = parsePosts()
  return posts.sort(sortByDate)
}
export default getPosts