import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.png'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className=' w-[99vw] md:w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px] ' >
      <Title text1={'ABOUT'} text2={'US'} />
      <div className=' w-[100%] flex items-center justify-center flex-col lg:flex-row ' >
        <div className=' lg:w-[50%] w-[100%] flex items-center justify-center ' >
          <img src={about} alt="" className=' lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm ' />
        </div>
        <div className=' lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px] '>
          <p className=' lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px] ' > oneKART is your go-to destination for stylish, comfortable, and affordable fashion. We curate a wide range of collections that combine modern trends with timeless elegance, crafted from quality fabrics to ensure durability and comfort. Our mission is to make fashion accessible to everyone while helping you express your unique style with confidence.</p>
          <p className=' lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px] ' > we believe fashion is more than just clothing—it’s a way to express who you are. From everyday essentials to trendy outfits, our collections are designed to fit every mood, occasion, and personality. With a focus on quality, comfort, and affordability, we strive to bring you styles that make you feel confident and look effortlessly chic.</p>
          <p className=' lg:w-[80%] text-[white]  text-[15px] lg:text-[18px] mt-[10px] font-bold' >Our Mission</p>
          <p className=' lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]' > oneKART is to redefine the way people experience fashion by bringing together style, quality, and affordability on a single platform. We aim to empower every individual to express themselves confidently through clothing, making trendy and timeless fashion accessible to all. With a focus on customer satisfaction, innovation, and trust, our mission is to create a seamless shopping experience that inspires confidence and adds joy to everyday living. </p>
        </div>
      </div>
      <div className=' w-[100%] flex items-center justify-center justify-center flex-col gap-[10px]' >
        < Title text1={'WHY'} text2={'CHOOSE US'} />
        <div className=' w-[80%] flex items-center justify-center lg:flex-row flex-col py-[40px] ' >
          <div className=' lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className=' text-[20px] font-semibold text-[#bff1f9] ' > Quality Assurance</b>
            <p>We guarantee quality through srtict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
          </div>

          <div className=' lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className=' text-[20px] font-semibold text-[#bff1f9] ' >Convenience</b>
            <p>At oneKART, we bring you a seamless and hassle-free shopping experience. From browsing to checkout, everything is designed to make your journey smooth and enjoyable.</p>
          </div>
          <div className=' lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className=' text-[20px] font-semibold text-[#bff1f9] ' >Exceptional Customer Service</b>
            <p>We believe in building trust through care and support. Our customer service team is always ready to assist, ensuring your satisfaction is our top priority.</p>
          </div>

        </div>



      </div>

      <div>
        <NewLetterBox />
      </div>





    </div>
  )
}

export default About

