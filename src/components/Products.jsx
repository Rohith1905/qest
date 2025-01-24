import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, delCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { products } from "../data/products";

const Products = () => {
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.handleCart);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const removeProduct = (product) => {
    dispatch(delCart(product));
  };

  useEffect(() => {
    setLoading(true);
    setFilter(products);
    setLoading(false);
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <Skeleton height={592} />
          </div>
        ))}
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = products.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(products)}>
            All
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Fitness Classes")}>
            Fitness Classes
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Mental Wellness")}>
            Mental Wellness
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Nutrition & Lifestyle Coaching")}>
            Nutrition & Lifestyle Coaching
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Community & Social")}>
            Community & Social
          </button>
        </div>

        {filter.map((product) => {
          const isAdded = cartItems.find((item) => item.id === product.id); // Check if product is in the cart
          return (
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100">
                <img className="card-img-top p-3" src={product.image} alt="Card" height={300} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description.substring(0, 90)}...</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">Rs. {product.price} /per-day</li>
                </ul>
                <div className="card-body">
                  <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                    View
                  </Link>
                  {isAdded ? (
                    <button className="btn btn-dark m-1" disabled>
                      Added to Cart
                    </button>
                  ) : (
                    <button className="btn btn-dark m-1" onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}>
                      Add to Cart
                    </button>
                  )}
                  {isAdded && (
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => {
                        toast.error("Removed from cart");
                        removeProduct(product);
                      }}
                    >
                      Undo Purchase
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
