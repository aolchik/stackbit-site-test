import PostCard from '../../components/PostCard'
import { pagesByLayout } from '../../utils/sourcebit-utils'

const BlogPage = ({ page, posts }) => {
  return (
    <div data-sb-object-id={page?.__metadata?.id}>
      <h1 data-sb-field-path="title">{page.frontmatter.title}</h1>
      {
        (posts ?? []).map((post) => (
          <PostCard key={post.__metadata.id} post={post} />))
      }
    </div>
  )
}

export default BlogPage

export async function getStaticProps(context) {
  const page = (await pagesByLayout('Blog'))[0]
  const posts = (await pagesByLayout('Post')).sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  })
  return { props: { page, posts } }
}
