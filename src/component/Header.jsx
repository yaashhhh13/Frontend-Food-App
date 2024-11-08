import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="Home-Header w-full overflow-x-hidden py-6 xs:py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-5">
        <div className="max-h-max">
          <div className="w-full flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-3/5">
              <h1 className="max-[450px]:text-5xl max-[600px]:text-7xl text-8xl text-purple-600 font-bold capitalize">
                We are <span className="text-amber-500">serious</span> for{" "}
                <span className="text-amber-500">food</span> &{" "}
                <span className="text-rose-600">delivery</span>
              </h1>
              <p className="py-2 sm:py-6 text-purple-500">
                We understand that food isn’t just fuel; it’s an experience. we’re committed to bringing you the best,
                right to your doorstep. From the freshest ingredients to the
                most delightful flavors, we’re here to satisfy your cravings
                with quality, speed, and care. Whether it's your favorite
                comfort food or an adventurous new dish, every meal is crafted
                with passion and delivered with precision
              </p>
              <Link to="/OurMenu" className="px-4 py-3 rounded-2xl text-xl font-semibold btn-primary bg-purple-600 text-white">explore menu</Link >
              {/* <button className="px-4 py-3 rounded-2xl text-xl font-semibold btn-accent m-2 bg-purple-600 text-white">watch now</button> */}
            </div>
            <div className="w-full lg:w-2/5 flex items-center justify-center">
              <img className="w-80" alt="" src="/displayImage.png" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
