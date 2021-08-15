import create, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ProvinceStore {
  province: string
  setProvince(province: string): void
}

export const useProvinceStore = create<ProvinceStore>(
  devtools((set: any) => ({
    province: 'Hà Nội',
    setProvince(province) {
      set({ province })
    },
  }))
)
