import React from "react";
import { selectAllProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LandingPage() {
  const products = useSelector(selectAllProducts);
  const displayedProducts = products.slice(1, 5);

  return (
    <>
      <div className="bg-gray-200 text-white text-center rounded-lg shadow-2xl">
        <div className=" text-blue-950 text-center py-2">
          <h1 className="text-4xl font-extrabold mb-2 mt-2">
            Welcome to Exclusive
            <span className="underline font-sans text-gray-800">
              {" "}
              Your Brand{" "}
            </span>
            Experience...
          </h1>
          <p className="text-lg text-blue-950 font-medium">
            Discover the latest trends and shop high-quality products at
            unbeatable prices.
            <br></br> Explore our collection and discover amazing deals on the
            latest trends.
          </p>
          
          {/* <Link
           to='/products'
           > 
          <button className="bg-green-700 text-white font-semibold px-8 py-3 mt-2 rounded-2xl hover:bg-green-500 transition duration-300">
            Shop Now
          </button>
          </Link> */}
        </div>
        <h2 className="pl-8 text-3xl font-extrabold text-gray-800 pt-1">
          Featured Products
        </h2>

        <div className="lg:col-span-4 pb-4">
          <div className="">
            <div className="mx-auto max-w-2xl px-4  py-0 sm:px-4 sm:py-0 lg:max-w-7xl lg:px-4 ">
              <div className=" mt-4 px-34 mr-2 ml-2   grid grid-cols-2 gap-x-1 gap-y-4 items-center justify-center sm:grid-cols-1 lg:grid-cols-4 xl:gap-x-4">
                {displayedProducts.map((product) => (
                  <Link to={`/product-detail/${product.id}`} key={product.id}>
                    <div
                      key={product.id}
                      className=" group relative p-6 bg-gray-50 transition-transform transform shadow-2xl"
                    >
                      <div className="min-h-40 aspect-h-1 aspect-w-1 w-full overflow-hidden  h-full group-hover:opacity-90 transform hover:scale-105 transition-transform">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          style={{ filter: "brightness(80%)" }}
                          className="h-full w-full object-fill object-center"
                        />
                      </div>

                      <div className="mt-4">
                        <div>
                          <h3 className="text-md text-gray-800  font-serif font-bold">
                            <a href={product.thumbnail}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              <p className="font-bold font-serif text-sm">
                                {product.title}
                              </p>
                            </a>
                          </h3>
                          <p className="-mt-0.5 text-xs font-semibold font-serif text-gray-600">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
