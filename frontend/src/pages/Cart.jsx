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
    <div className="w-full min-h-screen p-4 overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]">
      {/* Title */}
      <div className="text-center mt-20">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="w-full flex flex-col gap-6 mt-10">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id)
          return (
            <div
              key={index}
              className="w-full border-t border-b py-4 flex flex-col md:flex-row items-center md:items-start gap-4 bg-[#51808048] rounded-xl p-4"
            >
              {/* Product Image */}
              <img
                className="w-24 h-24 md:w-32 md:h-32 rounded-md object-cover"
                src={productData.image1}
                alt={productData.name}
              />

              {/* Product Info */}
              <div className="flex flex-col gap-3 w-full md:flex-1">
                <p className="text-lg md:text-xl text-[#aaf4e7] font-semibold">
                  {currency} {productData.price}
                </p>

                <p className="w-12 h-12 flex items-center justify-center text-white bg-[#518080b4] rounded-md border border-[#9ff9f9]">
                  {item.size}
                </p>

                {/* Quantity Input + Delete */}
                <div className="flex items-center gap-4">
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
                    className="text-[#9ff9f9] w-6 h-6 cursor-pointer"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Cart Total + Checkout Button */}
      <div className="flex justify-center md:justify-start items-center my-10">
        <div className="w-full max-w-md">
          <CartToatal />
          <button
            className="text-lg md:text-xl hover:bg-slate-500 cursor-pointer bg-[#51808048] py-3 px-8 rounded-2xl text-white flex items-center justify-center gap-4 border border-[#80808049] mt-6 w-full"
            onClick={async () => {
              if (cartData.length > 0) {
                navigate("/placeorder")
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
