import NextHead from 'next/head'
import React from 'react'

type Props = {
  title: string
  description: string
}

export const Head: React.FC<Props> = ({ title, description }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
}