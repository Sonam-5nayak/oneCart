import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartToatal from '../component/CartToatal';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = []
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItem])

  return (
    <div className="w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]">
      {/* Title */}
      <div className="h-[8%] w-[100%] text-center mt-[80px]">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="w-[100%] h-[92%] flex flex-col gap-[20px] mt-6">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id)
          return (
            <div
              key={index}
              className="w-[100%] border-t border-b flex items-center gap-6 bg-[#51808048] py-[15px] px-[20px] rounded-2xl relative"
            >
              {/* Product Image */}
              <img
                className="w-[100px] h-[100px] md:w-32 rounded-md"
                src={productData.image1}
                alt={productData.name}
              />

              {/* Product Info */}
              <div className="flex flex-col gap-[10px] flex-1">
                <p className="md:text-[25px] text-[20px] text-[#f3f9fc]">
                  {productData.name}
                </p>

                <div className="flex items-center gap-[20px]">
                  <p className="text-[20px] text-[#aaf4e7]">
                    {currency} {productData.price}
                  </p>
                  <p className="w-[40px] h-[40px] flex items-center justify-center text-[16px] text-white bg-[#518080b4] rounded-md border-[1px] mt-[5px] border-[#9ff9f9]">
                    {item.size}
                  </p>
                </div>

                {/* Quantity & Delete */}
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="w-16 md:w-20 px-2 py-1 text-white text-lg font-semibold bg-[#518080b4] border border-[#9ff9f9] rounded-md"
                    onChange={(e) =>
                      e.target.value === '' || e.target.value === '0'
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                  />
                  <RiDeleteBin6Line
                    className="text-[#9ff9f9] w-[25px] h-[25px] cursor-pointer"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cart
