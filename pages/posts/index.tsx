import { Head } from '../../components/Head'
import { DefaultLayout } from '../../components/templates/DefaultLayout'
import { Posts } from '../../components/organisms/Posts'
import { NextPage } from 'next'

type Props = {}

const PostsPage:NextPage<Props> = () => {

  return (
    <>
      <Head title='Posts | sun develop' description='Webエンジニアの備忘録' />
      <DefaultLayout>
        <Posts />
      </DefaultLayout>
    </>
  )
}

export default PostsPage;
