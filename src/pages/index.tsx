import { getAll } from '@/../lib/db'
import { GetServerSideProps } from 'next'
import { ISubmitPartUsecase } from '../tests/submit_part_usecase.test'

export const getServerSideProps: GetServerSideProps = async () => {
  const parts = await getAll()
  return {
    props: {
      parts
    }
  }
}

interface PostProps {
  parts: ISubmitPartUsecase[]
}

const Home = ({ parts }: PostProps) => {
  return <div>{JSON.stringify(parts, null, 4)}</div>
}

export default Home
