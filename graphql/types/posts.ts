import { Tag } from "./tags"

export type Post = {
  databaseId: number
  id: string
  title: string
  date: string
  content: string
  featuredImage: {
    node: {
      mediaItemUrl: string
    }
  }
  categories: {
    nodes: Array<{
      databaseId: number
      name: string
    }>
  }
  tags: {
    nodes: Tag[]
  }
}

export type ViewPost = Post & {
  dateDiff: string,
  formattedDate: string,
  clippedTitle: string
}