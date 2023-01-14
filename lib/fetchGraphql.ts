export const fetchGraph = async (query: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query }),
    },
  )
  const data = await response.json()
  return data.data
}

export const fetchGraphWithVariable = async (
  query: string, 
  variables: {}
) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ 
        query: query,
        variables: {
          ...variables
        },
      }),
    },
  )
  const data = await response.json()
  return data.data
}