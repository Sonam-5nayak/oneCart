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
    const name = e.target.name;
    const value = e.target.value;
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
      switch (method) {
        case 'cod':
          const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
          if (result.data) {
            toast.success("Order placed successfully 🎉")
            setCartItem({})
            navigate("/order")
          } else {
            toast.error("Failed to place order ❌")
          }
          break;
        case 'razorpay':
          const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
          if (resultRazorpay.data) {
            initPay(resultRazorpay.data)
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='  w-full pb-32 lg:pb-0 w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-start justify-center gap-8 p-4'>
      
      {/* Delivery Form */}
      <div className='lg:w-1/2 w-full flex justify-center mt-8 md:mt-0'>
        <form onSubmit={onSubmitHandler} className='w-full max-w-xl space-y-4'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />

          <div className='flex gap-2'>
            <input type="text" placeholder='First name' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' onChange={onChangeHandler} name='firstName' value={formData.firstName} />
            <input type="text" placeholder='Last name' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' onChange={onChangeHandler} name='lastName' value={formData.lastName} />
          </div>

          <input type="email" placeholder='Email address' className='w-full h-12 rounded-md bg-slate-700 text-white px-4' onChange={onChangeHandler} name='email' value={formData.email} />
          <input type="text" placeholder='Street' className='w-full h-12 rounded-md bg-slate-700 text-white px-4' onChange={onChangeHandler} name='street' value={formData.street} />

          <div className='flex gap-2'>
            <input type="text" placeholder='City' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' onChange={onChangeHandler} name='city' value={formData.city} />
            <input type="text" placeholder='State' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' onChange={onChangeHandler} name='state' value={formData.state} />
          </div>

          <div className='flex gap-2'>
            <input type="text" placeholder='Pincode' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' onChange={onChangeHandler} name='pinCode' value={formData.pinCode} />
            <input type="text" placeholder='Country' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4' onChange={onChangeHandler} name='country' value={formData.country} />
          </div>

          <input type="text" placeholder='Phone' className='w-full h-12 rounded-md bg-slate-700 text-white px-4' onChange={onChangeHandler} name='phone' value={formData.phone} />
        </form>
      </div>

      {/* Cart & Payment */}
      <div className='lg:w-1/2 w-full flex flex-col items-center gap-6'>
        <CartToatal />

        <Title text1={'PAYMENT'} text2={'METHOD'} />

        {/* Payment buttons */}
        <div className='w-full flex flex-col md:flex-row justify-between items-center gap-4'>
          <button onClick={() => setMethod('razorpay')} className={`w-40 h-12 rounded-sm ${method === 'razorpay' ? 'border-4 border-blue-900' : ''}`}>
            <img src={razorpay} className='w-full h-full object-contain rounded-sm' alt="Razorpay" />
          </button>
          <button onClick={() => setMethod('cod')} className={`w-52 h-12 bg-gradient-to-t from-[#95b3f8] to-white text-sm rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-4 border-blue-900' : ''}`}>
            CASH ON DELIVERY
          </button>
        </div>

        {/* Place Order button */}
        <button 
          onClick={onSubmitHandler} 
          className='w-full md:w-auto text-lg bg-[#3bcee848] py-3 px-8 rounded-2xl text-white mt-6 border border-[#80808049] hover:bg-slate-600'>
          PLACE ORDER
        </button>
      </div>
    </div>
  )
}

export default PlaceOrder
