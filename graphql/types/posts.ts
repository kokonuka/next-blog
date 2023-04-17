import { Category } from "./categories"
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
    nodes: Category[]
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