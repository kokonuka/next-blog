import { Header } from "../organisms/Header"
import { Footer } from "../organisms/Footer"

type Props = {
  children: React.ReactNode
}


export const PostLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  )
}