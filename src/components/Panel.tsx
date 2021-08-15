import { useEffect, useState } from 'react'
import { useProvinceStore } from 'src/store'
import { Line } from 'react-chartjs-2'
import provincePopulation from '../assets/danso.json'
import { sir_sol } from '@/services/seir'

const Panel = () => {
  const province: any = useProvinceStore((state) => state.province)
  const [population, setPopulation] = useState(0)
  const [properties, setProperties] = useState<any>({
    step: 1,
    max: 200,
  })
  const [data, setData] = useState({})
  useEffect(() => {
    console.log(province)
    const population: any = provincePopulation[province]
    setPopulation(parseInt(population))
  }, [province])
  const calculateData = () => {
    const data = sir_sol(properties.step, properties.max)
    const t = data.t
    const S = data.y.map((x) => {
      return x[0] * population
    })
    const I = data.y.map((x) => {
      return x[1] * population
    })
    const R = data.y.map((x) => {
      return x[2] * population
    })
    setData({
      labels: t,
      datasets: [
        {
          label: 'Có thể nhiễm',
          data: S,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: 'Bị nhiễm',
          data: I,
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: 'Khỏi bệnh',
          data: R,
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
        },
      ],
    })
  }
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  return (
    <div className="flex flex-col p-10 h-full w-full">
      <h1 className="text-xl font-bold">
        Tỉnh: {province} - Dân số: {population} người
      </h1>
      <div className="flex flex-col h-1/2">
        <div>
          <p>Bước nhảy</p>
          <input
            type="number"
            placeholder="Bước nhảy"
            value={properties.step}
            onChange={(e) =>
              setProperties({ ...properties, step: e.target.value })
            }
          />
        </div>
        <div>
          <p>Số ngày tối đa</p>
          <input
            type="number"
            placeholder="Số ngày"
            value={properties.max}
            onChange={(e) =>
              setProperties({ ...properties, max: e.target.value })
            }
          />
        </div>
        <button
          className="px-2 py-1 border-2 border-black"
          onClick={(_) => calculateData()}
        >
          Tính
        </button>
      </div>
      <div className="h-1/2">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default Panel
