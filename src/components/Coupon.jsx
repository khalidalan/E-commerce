function Coupon() {
  return (
    <div className="flex gap-8 items-center container pt-20 ">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Coupon Code"
          className="border-2 border-gray-300 py-4 px-6 outline-none rounded"
        />
        <button className="bg-blue-600 text-white py-4 px-8  font-medium rounded transition duration-300 ease-in-out hover:bg-blue-700 active:scale-95">
          Apply Coupon
        </button>
      </div>

      <div className="flex flex-col border-2 border-gray-300 container xl:gap-10 gap-6 p-6 w-fit ">
        <p className="text-2xl font-semibold tracking-wider inter">
          Cart Total
        </p>

        <div className="flex justify-between ">
          <p>Subtotal:</p>
          <p>$650</p>
        </div>
        <hr className="opacity-40 w-[96%]  mx-auto" />

        <div className="flex justify-between ">
          <p>Shipping:</p>
          <p>Free</p>
        </div>

        <hr className="opacity-40 w-[96%]  mx-auto" />

        <div className="flex justify-between ">
          <p>Total:</p>
          <p>$650</p>
        </div>

        <button className="bg-blue-600 text-white py-4 px-12 font-medium rounded transition duration-300 ease-in-out hover:bg-blue-700 active:scale-95">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default Coupon;
