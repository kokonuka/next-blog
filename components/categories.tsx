import { useRouter } from 'next/router'

export default function Categories() {
  const router = useRouter()

  if(router.pathname === "/search") return null

  return (
    <div className="bg-white sticky top-0">
      <span>カテゴリー</span>
      <span>カテゴリー</span>
      <span>カテゴリー</span>
      <span>カテゴリー</span>
      <span>カテゴリー</span>
      <span>カテゴリー</span>
    </div>
  )
}