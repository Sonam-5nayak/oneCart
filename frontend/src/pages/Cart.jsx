import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartToatal from "../component/CartToatal";

function Cart() {
  const { products, currency, cartItem, updateQuantity } =
    useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="w-full min-h-screen p-5 bg-gradient-to-l from-[#141414] to-[#0c2025] pb-32">
      {/* Title */}
      <div className="text-center mt-20 mb-10">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-6">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-[#51808048] p-4 rounded-2xl border border-[#4d8890]"
            >
              {/* Product Image */}
              <img
                className="w-[100px] h-[100px] sm:w-28 sm:h-28 rounded-md object-cover"
                src={productData?.image1}
                alt={productData?.name}
              />

              {/* Product Info */}
              <div className="flex flex-col gap-2 flex-1">
                <p className="text-lg sm:text-xl text-[#f3f9fc] font-medium break-words">
                  {productData?.name}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-base sm:text-lg text-[#aaf4e7]">
                    {currency} {productData?.price}
                  </p>
                  <p className="w-10 h-10 flex items-center justify-center text-sm sm:text-base text-white bg-[#518080b4] rounded-md border border-[#9ff9f9]">
                    {item.size}
                  </p>
                </div>
              </div>

              {/* Quantity Input & Delete */}
              <div className="flex items-center gap-3 sm:ml-auto">
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="w-14 sm:w-16 text-white text-sm sm:text-base font-semibold bg-[#518080b4] py-2 px-3 rounded-md border border-[#9ff9f9]"
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                />
                <RiDeleteBin6Line
                  className="text-[#9ff9f9] w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-red-400"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total & Checkout Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-8 my-12">
        <div className="w-full sm:w-[450px]">
          <CartToatal />
          <button
            className="w-full text-base sm:text-lg hover:bg-slate-500 cursor-pointer bg-[#518080b4] py-3 px-6 rounded-2xl text-white flex items-center justify-center gap-3 border border-[#9ff9f9] mt-6"
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("Your cart is empty!");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
