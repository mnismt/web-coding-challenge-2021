import type { NextPage } from 'next'
import Map2D from '@/components/Map2D'
import Panel from '@/components/Panel'

const Home: NextPage = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2 h-full">
        <Map2D />
      </div>
      <div className="w-1/2 h-full shadow-lg">
        <Panel />
      </div>
    </div>
  )
}

export default Home
