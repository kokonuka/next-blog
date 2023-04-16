export type Post = {
  id: string
  title: string
  date: string
  content: string
  featuredImage: {
    node: {
      mediaItemUrl: string
    }
  }
  tags: {
    nodes: Array<{
      databaseId: number
      name: string
    }>
  }
}

export type Tag = {
  id: string
  name: string
}