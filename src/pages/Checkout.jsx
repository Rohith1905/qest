import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../redux/action/userActions"; // Import action
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const state = useSelector((state) => state.handleCart); // Access cart items from the redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect all form data at once
    const formData = new FormData(e.target);
    const newUser = {};

    formData.forEach((value, key) => {
      newUser[key] = value;
    });

    // Validate card number
    if (newUser.cardNumber.replace(/\s/g, "").length !== 16) {
      alert("Card number must be 16 digits long!");
      return;
    }

    // Validate expiration date (MM/YY)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(newUser.expirationDate)) {
      alert("Enter a valid expiration date in MM/YY format!");
      return;
    }

    // Validate CVV (3 digits)
    if (!/^\d{3}$/.test(newUser.cvv)) {
      alert("CVV must be 3 digits!");
      return;
    }

    setUser(newUser); // Update state only on submit
    console.log("Updated User Data:", newUser);

    // Dispatch to Redux store
    dispatch(setUserDetails(newUser));

    // Navigate to invoice page
    navigate("/invoice");
  };

  // Empty Cart Message
  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">No items in Cart</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  // Cart Summary and Billing Form
  const ShowCheckout = () => {
    let subtotal = 0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})<span>Rs. {Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Discount
                    <span>--</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <strong>Total amount</strong>
                    <span>
                      <strong>Rs. {Math.round(subtotal)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing Address</h4>
              </div>
              <div className="card-body">
                <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    {/* First Name */}
                    <div className="col-sm-6 my-1">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder=""
                        required
                      />
                    </div>

                    {/* Last Name */}
                    <div className="col-sm-6 my-1">
                      <label htmlFor="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="col-12 my-1">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div className="col-12 my-1">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        required
                      />
                    </div>

                    {/* Card Number */}
                    <div className="col-12 my-1">
                      <label htmlFor="cardNumber" className="form-label">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        name="cardNumber"
                        required
                        maxLength={19} // Card number max length with spaces
                      />
                    </div>

                    {/* Expiration Date */}
                    <div className="col-md-6 my-1">
                      <label htmlFor="expirationDate" className="form-label">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="expirationDate"
                        name="expirationDate"
                        placeholder="MM/YY"
                        required
                        pattern="(0[1-9]|1[0-2])\/\d{2}" // Validates MM/YY format
                        title="Enter expiration date in MM/YY format"
                      />
                    </div>

                    {/* CVV */}
                    <div className="col-md-6 my-1">
                      <label htmlFor="cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        name="cvv"
                        required
                        maxLength="3"
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="address2" className="form-label">
                        Address 2{" "}
                        <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Apartment or suite"
                      />
                    </div>

                    {/* Country and State */}
                    <div className="col-md-5 my-1">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <select className="form-select" id="country" required>
                        <option value="">Choose...</option>
                        <option>India</option>
                      </select>
                    </div>

                    <div className="col-md-4 my-1">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <select className="form-select" id="state" required>
                        <option value="">Choose...</option>
                        <option>Punjab</option>
                      </select>
                    </div>

                    <div className="col-md-3 my-1">
                      <label htmlFor="zip" className="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>

                  <hr className="my-4" />
                  <button
                    className="w-100 btn btn-primary"
                    type="submit"
                  >
                    Continue to checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
