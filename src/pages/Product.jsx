import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { products } from "../data/products";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.handleCart);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const removeProduct = (product) => {
    dispatch(delCart(product));
  };

  useEffect(() => {
    const getProduct = () => {
      setLoading(true);
      setLoading2(true);
      const foundProduct = products.find((item) => item.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        const relatedProducts = products.filter(
          (item) =>
            item.category === foundProduct.category && item.id !== foundProduct.id
        );
        setSimilarProducts(relatedProducts);
      }
      setLoading(false);
      setLoading2(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 py-3">
            <Skeleton height={400} width={400} />
          </div>
          <div className="col-md-6 py-5">
            <Skeleton height={30} width={250} />
            <Skeleton height={90} />
            <Skeleton height={40} width={70} />
            <Skeleton height={50} width={110} />
            <Skeleton height={120} />
            <Skeleton height={40} width={110} inline={true} />
            <Skeleton className="mx-3" height={40} width={110} />
          </div>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    const isAdded = cartItems.find((item) => item.id === product.id); // Check if the product is in the cart

    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 col-sm-12 py-3">
            <img
              className="img-fluid"
              src={product.image}
              alt={product.title}
              width="400px"
              height="400px"
            />
          </div>
          <div className="col-md-6 col-md-6 py-5">
            <h4 className="text-uppercase text-muted">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead">
              {product.rating && product.rating.rate} <i className="fa fa-star"></i>
            </p>
            <h3 className="display-6 my-4">Rs. {product.price}</h3>
            <p className="lead">{product.description}</p>
            {isAdded ? (
              <button className="btn btn-dark" disabled>
                Added to Cart
              </button>
            ) : (
              <button
                className="btn btn-outline-dark"
                onClick={() => {
                  addProduct(product);
                }}
              >
                Add to Cart
              </button>
            )}
            {isAdded && (
              <button
                className="btn btn-danger mx-3"
                onClick={() => {
                  removeProduct(product);
                }}
              >
                Undo Purchase
              </button>
            )}
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const Loading2 = () => {
    return (
      <div className="my-4 py-4">
        <div className="d-flex">
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
        </div>
      </div>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <div className="py-4 my-4">
        <div className="d-flex">
          {similarProducts.length > 0 ? (
            similarProducts.map((item) => {
              // Check if the product is already in the cart
              const isAdded = cartItems.find((cartItem) => cartItem.id === item.id);
              return (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title.substring(0, 15)}...</h5>
                  </div>
                  <div className="card-body">
                    <Link to={"/product/" + item.id} className="btn btn-dark m-1">
                      Buy Now
                    </Link>
                    {isAdded ? (
                      <>
                        <button className="btn btn-dark m-1" disabled>
                          Added to Cart
                        </button>
                        <button
                          className="btn btn-danger m-1"
                          onClick={() => removeProduct(item)}
                        >
                          Undo Purchase
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-dark m-1"
                        onClick={() => addProduct(item)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No similar products found.</p>
          )}
        </div>
      </div>
    );
  };
  

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {loading || !product ? <Loading /> : <ShowProduct />}
        </div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
