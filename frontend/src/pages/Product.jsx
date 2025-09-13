import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex  flex-col items-center  py-[10px] gap-12' >
      <div className='w-full max-w-7xl px-4 ' >
        <LatestCollection />
      </div>
      <div className='w-full max-w-7xl px-4' >
        <BestSeller />
      </div>
    </div>
  )
}

export default Product
