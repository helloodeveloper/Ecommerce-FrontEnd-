import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className=" bg-gray-900">
        <div className="max-w-2xl mx-auto text-white pt-10">
          <div className="p-2 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p className="order-2 md:order-1 md:mt-0">
              {" "}
              © AnkitYadav, 2023.{" "}
            </p>
            <div className="order-1 md:order-2">
              <span className="px-2"><Link to='/about-us'>About us</Link></span>
              <span className="px-2 border-l">Contact us</span>
              <span className="px-2 border-l">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
