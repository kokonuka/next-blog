import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

import Header from './header'
import Categories from './categories'
import Footer from './footer'

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Categories />
      <main className="bg-blue-50">{children}</main>
      <Footer />
    </>
  )
}