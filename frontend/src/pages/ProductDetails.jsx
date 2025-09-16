import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { shopDataContext } from '../context/ShopContext'
import RelatedProduct from '../component/RelatedProduct';
import { toast } from 'react-toastify';
import Loading from '../../../admin/src/component/Loading';

function ProductDetails() {
  let { productId } = useParams()
  let { products, currency, addtoCart } = useContext(shopDataContext)
  let [productData, setProductData] = useState(false)

  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.find((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage1(item.image1)
        setImage2(item.image2)
        setImage3(item.image3)
        setImage4(item.image4)
        setImage(item.image1);
        return null;
      }
    })
  }

  useEffect(() => {
    if (productData) {
      console.log(productData);
    }
  }, [productData]);

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  // ✅ handle Add to Cart with loading and toast
  const handleAddToCart = async () => {
    if (!size) {
      toast.error("Please select a size before adding to cart!");
      return;
    }
    try {
      await addtoCart(productData._id, size);
      toast.success("Product successfully added to cart!");
    } catch (err) {
      console.error("Add to cart failed", err);
      toast.error("Something went wrong while adding to cart");
    }
  };

  return productData ? (
    <div>
      {/* Main Section */}
      <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-center justify-start gap-5 py-10'>
        
        {/* Images */}
        <div className='lg:w-1/2 w-[90%] flex flex-col-reverse lg:flex-row items-center justify-center gap-4'>
          <div className='lg:w-[20%] w-full flex lg:flex-col flex-row flex-wrap items-center justify-center gap-3'>
            {[image1, image2, image3, image4].map((img, idx) => (
              <div key={idx} className='w-[60px] h-[60px] md:w-[100px] md:h-[110px] border border-gray-500 rounded-md'>
                <img src={img} alt="" className='w-full h-full cursor-pointer rounded-md object-cover'
                  onClick={() => setImage(img)} />
              </div>
            ))}
          </div>
          <div className='lg:w-[70%] w-full h-[300px] md:h-[500px] border border-gray-500 rounded-md overflow-hidden'>
            <img src={image} alt="" className='w-full h-full rounded-md object-contain bg-black' />
          </div>
        </div>

        {/* Product Details */}
        <div className='lg:w-1/2 w-full flex flex-col gap-4 px-5 text-white'>
          <h1 className='text-2xl md:text-4xl font-semibold'>{productData.name.toUpperCase()}</h1>

          {/* Ratings */}
          <div className='flex items-center gap-1'>
            <FaStar className='text-yellow-400' />
            <FaStar className='text-yellow-400' />
            <FaStar className='text-yellow-400' />
            <FaStar className='text-yellow-400' />
            <FaStarHalfAlt className='text-yellow-400' />
            <p className='text-lg font-semibold pl-2'>(124)</p>
          </div>

          {/* Price */}
          <p className='text-xl md:text-2xl font-bold'>{currency} {productData.price}</p>

          {/* Description */}
          <p className='text-base md:text-lg w-full md:w-[80%]'>
            {productData.description} and Stylish, breathable cotton shirt with a modern slim fit.
            Easy to wash, super comfortable, and designed for effortless style.
          </p>

          {/* Sizes */}
          <div className='flex flex-col gap-3 mt-3'>
            <p className='text-lg font-semibold'>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 rounded-md ${item === size ? 'bg-black text-blue-400 text-lg' : 'bg-slate-300 text-black'}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className='text-sm md:text-base active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-3 px-6 rounded-2xl mt-3 border border-gray-500 text-white shadow-md shadow-black flex items-center justify-center gap-2'
              onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>

          <div className='w-full h-[1px] bg-slate-700 my-3'></div>
          <div className='text-sm md:text-base'>
            <p>✅ 100% Original Product</p>
            <p>💰 Cash on delivery available</p>
            <p>🔄 Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-start justify-start px-5 md:px-10 py-10'>
        <div className='flex flex-wrap gap-3 mb-5'>
          <p className='border px-5 py-3 text-sm md:text-base text-white cursor-pointer'>Description</p>
          <p className='border px-5 py-3 text-sm md:text-base text-white cursor-pointer'>Reviews (124)</p>
        </div>

        <div className='w-full md:w-[80%] min-h-[150px] bg-[#3336397c] border text-white text-sm md:text-base lg:text-lg p-5 rounded-md'>
          <p>
            Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneKART.
            Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style.
            Easy to maintain and perfect for any setting, this shirt is a must-have for those who value both fashion and function.
          </p>
        </div>

        <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
      </div>
    </div>
  ) : <Loading />
}

export default ProductDetails
