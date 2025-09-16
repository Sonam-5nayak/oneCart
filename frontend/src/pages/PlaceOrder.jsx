import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartToatal from '../component/CartToatal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function PlaceOrder() {
  let [method, setMethod] = useState('cod')
  let navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)
  let [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
        if (data) {
          navigate("/order")
          setCartItem({})
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      if (method === 'cod') {
        const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
        if (result.data) {
          toast.success("Order placed successfully 🎉")
          setCartItem({})
          navigate("/order")
        } else {
          toast.error("Failed to place order ❌")
        }
      } else if (method === 'razorpay') {
        const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
        if (resultRazorpay.data) {
          initPay(resultRazorpay.data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-start justify-center gap-10 p-5 pb-32'>
      
      {/* Delivery Form */}
      <div className='lg:w-1/2 w-full'>
        <form onSubmit={onSubmitHandler} className='w-full bg-transparent'>
          <div className='py-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className='flex gap-3 mb-3'>
            <input type="text" name='firstName' value={formData.firstName} onChange={onChangeHandler}
              placeholder='First name' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' required />
            <input type="text" name='lastName' value={formData.lastName} onChange={onChangeHandler}
              placeholder='Last name' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' required />
          </div>

          <input type="email" name='email' value={formData.email} onChange={onChangeHandler}
            placeholder='Email address' className='w-full h-12 rounded-md bg-slate-700 text-white px-4 mb-3' required />

          <input type="text" name='street' value={formData.street} onChange={onChangeHandler}
            placeholder='Street' className='w-full h-12 rounded-md bg-slate-700 text-white px-4 mb-3' required />

          <div className='flex gap-3 mb-3'>
            <input type="text" name='city' value={formData.city} onChange={onChangeHandler}
              placeholder='City' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' required />
            <input type="text" name='state' value={formData.state} onChange={onChangeHandler}
              placeholder='State' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' required />
          </div>

          <div className='flex gap-3 mb-3'>
            <input type="text" name='pinCode' value={formData.pinCode} onChange={onChangeHandler}
              placeholder='Pincode' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' required />
            <input type="text" name='country' value={formData.country} onChange={onChangeHandler}
              placeholder='Country' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' required />
          </div>

          <input type="text" name='phone' value={formData.phone} onChange={onChangeHandler}
            placeholder='Phone' className='w-full h-12 rounded-md bg-slate-700 text-white px-4 mb-5' required />

          {/* Submit Button */}
          <button type='submit'
            className='w-full md:w-auto px-10 py-3 bg-[#3bcee848] text-white rounded-2xl border border-[#80808049] hover:bg-slate-600'>
            PLACE ORDER
          </button>
        </form>
      </div>

      {/* Cart & Payment Section */}
      <div className='lg:w-1/2 w-full flex flex-col items-center gap-6'>
        <CartToatal />
        <div className='py-3'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
        </div>
        <div className='w-full flex flex-col md:flex-row items-center justify-center gap-6'>
          <button onClick={() => setMethod('razorpay')}
            className={`w-40 h-14 rounded-md ${method === 'razorpay' ? 'border-4 border-blue-900' : ''}`}>
            <img src={razorpay} alt="Razorpay" className='w-full h-full object-contain rounded-md' />
          </button>
          <button onClick={() => setMethod('cod')}
            className={`w-52 h-14 bg-gradient-to-t from-[#95b3f8] to-white text-sm rounded-md font-bold text-[#332f6f] ${method === 'cod' ? 'border-4 border-blue-900' : ''}`}>
            CASH ON DELIVERY
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
