<div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-start md:items-center justify-center gap-10 p-5">
  
  {/* Left Section - Delivery Form */}
  <div className="w-full md:w-1/2 flex justify-center mt-20 md:mt-0">
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-lg bg-transparent"
    >
      <div className="py-3">
        <Title text1="DELIVERY" text2="INFORMATION" />
      </div>

      {/* First & Last Name */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="First name"
          className="flex-1 h-12 rounded-md bg-slate-700 text-white text-base px-4 shadow-sm shadow-[#343434]"
          onChange={onChangeHandler}
          name="firstName"
          value={formData.firstName}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          className="flex-1 h-12 rounded-md bg-slate-700 text-white text-base px-4 shadow-sm shadow-[#343434]"
          onChange={onChangeHandler}
          name="lastName"
          value={formData.lastName}
          required
        />
      </div>

      {/* Email */}
      <input
        type="email"
        placeholder="Email address"
        className="w-full h-12 mb-4 rounded-md bg-slate-700 text-white text-base px-4 shadow-sm shadow-[#343434]"
        onChange={onChangeHandler}
        name="email"
        value={formData.email}
        required
      />

      {/* Street */}
      <input
        type="text"
        placeholder="Street"
        className="w-full h-12 mb-4 rounded-md bg-slate-700 text-white text-base px-4 shadow-sm shadow-[#343434]"
        onChange={onChangeHandler}
        name="street"
        value={formData.street}
        required
      />

      {/* City & State */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="City"
          className="flex-1 h-12 rounded-md bg-slate-700 text-white text-base px-4 shadow-sm shadow-[#343434]"
          onChange={onChangeHandler}
          name="city"
          value={formData.city}
          required
        />
        <input
          type="text"
          placeholder="State"
          className="flex-1 h-12 rounded-md bg-slate-700 text-white text-base px-4 shadow-sm shadow-[#343434]"
          onChange={onChangeHandler}
          name="state"
          value={formData.state}
          required
        />
      </div>

      {/* Pincode & Country */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Pincode"
          className="flex-1 h-12 rounded-md bg-slate-700 text-white text-base px-4 shadow-sm shadow-[#343434]"
          onChange={onChangeHandler}
          name="pinCode"
          value={formData.pinCode}
          required
        />
        <input
          type="text"
          placeholder="Country"
          className="flex-1 h-12 rounded-md bg-slate-700 text-white text-base px-4 shadow-sm shadow-[#343434]"
          onChange={onChangeHandler}
          name="country"
          value={formData.country}
          required
        />
      </div>

      {/* Phone */}
      <input
        type="text"
        placeholder="Phone"
        className="w-full h-12 mb-6 rounded-md bg-slate-700 text-white text-base px-4 shadow-sm shadow-[#343434]"
        onChange={onChangeHandler}
        name="phone"
        value={formData.phone}
        required
      />

      {/* Place Order Button */}
      <button
        type="submit"
        className="w-full text-lg bg-[#3bcee848] py-3 rounded-xl text-white flex items-center justify-center border border-gray-500 hover:bg-slate-500 transition"
      >
        PLACE ORDER
      </button>
    </form>
  </div>

  {/* Right Section - Cart & Payment */}
  <div className="w-full md:w-1/2 flex flex-col items-center gap-6">
    <div className="w-full max-w-lg">
      <CartToatal />
    </div>

    <div className="py-3">
      <Title text1="PAYMENT" text2="METHOD" />
    </div>

    {/* Payment Methods */}
    <div className="w-full flex flex-col sm:flex-row justify-center gap-6">
      {/* Razorpay */}
      <button
        onClick={() => setMethod("razorpay")}
        className={`w-full sm:w-40 h-14 rounded-md overflow-hidden ${
          method === "razorpay" ? "border-4 border-blue-900" : "border"
        }`}
      >
        <img
          src={razorpay}
          className="w-full h-full object-cover"
          alt="razorpay"
        />
      </button>

      {/* COD */}
      <button
        onClick={() => setMethod("cod")}
        className={`w-full sm:w-52 h-14 bg-gradient-to-t from-[#95b3f8] to-white text-sm sm:text-base rounded-md font-bold text-[#332f6f] ${
          method === "cod" ? "border-4 border-blue-900" : "border"
        }`}
      >
        CASH ON DELIVERY
      </button>
    </div>
  </div>
</div>
