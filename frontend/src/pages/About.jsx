import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.png'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-[#141414] to-[#0c2025] gap-12 pt-20">
      {/* About Us Title */}
      <Title text1={'ABOUT'} text2={'US'} />

      {/* Image + Text Section */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center px-4 lg:px-8 gap-10">
        {/* Image */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <img
            src={about}
            alt="About us"
            className="lg:w-2/3 w-4/5 shadow-md shadow-black rounded-sm"
          />
        </div>

        {/* Text */}
        <div className="lg:w-1/2 w-full flex flex-col items-start gap-5 mt-5 lg:mt-0 text-white">
          <p className="lg:w-4/5 w-full text-sm md:text-base">
            oneKART is your go-to destination for stylish, comfortable, and affordable fashion. 
            We curate a wide range of collections that combine modern trends with timeless elegance, 
            crafted from quality fabrics to ensure durability and comfort. Our mission is to make 
            fashion accessible to everyone while helping you express your unique style with confidence.
          </p>
          <p className="lg:w-4/5 w-full text-sm md:text-base">
            We believe fashion is more than just clothing—it’s a way to express who you are. 
            From everyday essentials to trendy outfits, our collections are designed to fit every mood, 
            occasion, and personality. With a focus on quality, comfort, and affordability, we strive 
            to bring you styles that make you feel confident and look effortlessly chic.
          </p>
          <p className="lg:w-4/5 text-lg md:text-xl font-bold mt-3 text-[#bff1f9]">
            Our Mission
          </p>
          <p className="lg:w-4/5 w-full text-sm md:text-base">
            oneKART is to redefine the way people experience fashion by bringing together style, 
            quality, and affordability on a single platform. We aim to empower every individual to 
            express themselves confidently through clothing, making trendy and timeless fashion 
            accessible to all. With a focus on customer satisfaction, innovation, and trust, our 
            mission is to create a seamless shopping experience that inspires confidence and adds 
            joy to everyday living.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full flex flex-col items-center gap-6">
        <Title text1={'WHY'} text2={'CHOOSE US'} />

        <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center gap-6 py-10">
          {/* Card 1 */}
          <div className="lg:w-1/3 w-11/12 min-h-[250px] border border-gray-100 flex flex-col items-center justify-center gap-4 px-6 py-4 text-white backdrop-blur-sm bg-[#ffffff0b] rounded-md">
            <b className="text-xl font-semibold text-[#bff1f9]">Quality Assurance</b>
            <p className="text-center">
              We guarantee quality through strict checks, reliable sourcing, 
              and a commitment to customer satisfaction always.
            </p>
          </div>

          {/* Card 2 */}
          <div className="lg:w-1/3 w-11/12 min-h-[250px] border border-gray-100 flex flex-col items-center justify-center gap-4 px-6 py-4 text-white backdrop-blur-sm bg-[#ffffff0b] rounded-md">
            <b className="text-xl font-semibold text-[#bff1f9]">Convenience</b>
            <p className="text-center">
              At oneKART, we bring you a seamless and hassle-free shopping experience. 
              From browsing to checkout, everything is designed to make your journey smooth and enjoyable.
            </p>
          </div>

          {/* Card 3 */}
          <div className="lg:w-1/3 w-11/12 min-h-[250px] border border-gray-100 flex flex-col items-center justify-center gap-4 px-6 py-4 text-white backdrop-blur-sm bg-[#ffffff0b] rounded-md">
            <b className="text-xl font-semibold text-[#bff1f9]">Exceptional Customer Service</b>
            <p className="text-center">
              We believe in building trust through care and support. 
              Our customer service team is always ready to assist, ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewLetterBox />
    </div>
  )
}

export default About
