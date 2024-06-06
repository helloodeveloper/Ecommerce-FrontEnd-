import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 font-sans">
      {/* Navigation */}
      <div className="container mx-auto flex justify-between items-center rounded-lg">
        <Link
          to="/"
          className="text-4xl px-4 underline font-serif text-violet-950 font-bold"
        >
          Your Brand
        </Link>
        {/* Add your navigation links here */}
      </div>
      {/* About Section */}
      <section className="container mx-auto mt-4 p-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <svg
              className="h-30 w-30"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="45" fill="#333" />

              <text
                x="28"
                y="60"
                font-family="Arial, sans-serif"
                font-size="40"
                fill="#fff"
              >
                Y
              </text>
              <text
                x="50"
                y="60"
                font-family="Arial, sans-serif"
                font-size="40"
                fill="#fff"
              >
                B
              </text>
            </svg>
          </div>
          <div className="md:w-1/2 md:ml-8">
            <h1 className="text-4xl font-bold mb-4 text-violet-900 underline">
              About Us
            </h1>
            <p className="text-gray-700 text-xl">
              Welcome to Your Brand, where we strive to provide the best
              products and services to our customers. Our journey began with a
              passion for delivering high-quality goods to people around the
              world.
            </p>
            <p className="text-gray-700 mt-4 text-lg">
              At Your Brand, we believe in creating memorable experiences for
              our customers. Our commitment to quality, innovation, and customer
              satisfaction sets us apart in the ecommerce landscape.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
