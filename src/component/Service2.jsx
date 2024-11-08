const Service2 = () => {
  return (
    <div className="service w-full">
      <div className="w-full hero min-h-fit p-1 sm:p-4">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-8xl text-purple-700 font-bold max-[350px]:text-5xl">
              Limitless
              <span className="text-rose-500"> Services</span>
              <span className="text-amber-500"> for</span> All Needs
            </h1>
            <p className="py-6 text-md text-purple-400 sm:text-2xl">
              Our commitment goes beyond just providing services – we’re here to
              offer solutions tailored to fit every need. With a focus on
              quality, reliability, and innovation, we ensure that you receive the highest level of
              support and expertise. From idea to execution, we’re dedicated to
              delivering an exceptional experience that drives your goals
              forward.
            </p>
            <button className="p-3 text-md sm:text-2xl rounded-2xl bg-rose-500 border-0">
              About Us
            </button>
          </div>
          <img
            src="https://pngimg.com/uploads/chef/chef_PNG193.png"
            className="max-w-sm max-[350px]:w-40"
          />
        </div>
      </div>
    </div>
  );
};

export default Service2;
