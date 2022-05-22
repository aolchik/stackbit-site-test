import Markdown from 'markdown-to-jsx'

import { pageUrlPath } from '../../utils/page-utils'
import { pagesByLayout } from '../../utils/sourcebit-utils'

export default function PostPage({ post }) {
  return (
    <div data-sb-object-id={post?.__metadata?.id}> 
      <h1 data-sb-field-path="title">{post.frontmatter.title}</h1>
      <Markdown data-sb-field-path="markdown_content">{post.markdown}</Markdown>
    </div>
  )
}

export async function getStaticProps({ params }) {
  console.log('>> getStaticPaths')
  console.log('>>>> params')
  console.log(params)
  const currentPath = `/blog/${params.slug}`
  // FIXME: Could allPosts be retrieved only once?
  const allPosts = await pagesByLayout('Post')
  const post = allPosts.find((page) => pageUrlPath(page) === currentPath)
  return { props: { post } }
}

export async function getStaticPaths() {
  console.log('>> getStaticPaths')
  const allPosts = await pagesByLayout('Post')

  const result =  {
    paths: allPosts.map((page) => pageUrlPath(page)),
    fallback: false,
  }

  console.log(result)

  return result
}