import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext/CartContext";
import axios from "axios";
import UserContext from "../context/UserContext/userContext";

const CheckoutPage = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  const contxtUser = useContext(UserContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const placeOrder = async () => {
    var arr = [];
    cartItems.map((val) => {
      var obj1 = {
        id: val._id,
        itemName: val.itemName,
        itemPrice: val.itemPrice,
      };
      arr.push(obj1);
    });

    var obj = {
      items: arr,
      userId: contxtUser?.userExist,
      status: paymentMethod,
      totalPrice: totalPrice,
    };
    await axios.post("http://localhost:3000/order/placeOrder", obj);
    console
      .log(response.data.response)
      .then((val) => console.log(val))
      .catch((e) => console.log("error"));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-[8%]">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Payment Options (Left) */}
        <div className="lg:w-1/2 w-full bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-black">
            Payment Method
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="COD"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
                className="mr-2"
              />
              <label htmlFor="COD" className="text-lg font-medium text-black">
                Cash on Delivery
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="Onine"
                name="payment"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={() => setPaymentMethod("Online")}
                className="mr-2"
              />
              <label
                htmlFor="Online"
                className="text-lg font-medium text-black"
              >
                Visa Card Payment
              </label>
            </div>
          </div>

          {/* Show Card Details Form if Visa Card is selected */}
          {paymentMethod === "card" && (
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-black mb-4">
                Card Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9123 0000"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-light-orange focus:border-light-orange"
                  />
                </div>
                <div className="flex space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-light-orange focus:border-light-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      placeholder="123"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-light-orange focus:border-light-orange"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cart Summary (Right) */}
        <div className="lg:w-1/2 w-full bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-black">Your Cart</h2>
          <div className="space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b border-gray-300 pb-2"
                >
                  <span className="text-lg text-black">{item.itemName}</span>
                  <span className="text-lg text-black">
                    {item.quantity} x ${item.itemPrice}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>

          {/* Total Amount */}
          <div className="mt-6 text-lg font-semibold text-black">
            <span>Total: </span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={placeOrder}
          className="bg-orange-400 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
