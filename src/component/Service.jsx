const Service = () => {
  return (
    <>
      <div className="service w-full">
        <div className="hero min-h-fit p-1">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="https://pngimg.com/uploads/chef/chef_PNG193.png"
              className="max-w-sm max-[350px]:w-40"
            />
            <div>
              <h1 className="text-8xl text-purple-700 font-bold max-[350px]:text-5xl">
                we are <span className="text-rose-500">more</span> than{" "}
                <span className="text-amber-500">multiple</span> service
              </h1>
              <p className="py-6 text-lg text-purple-400 sm:text-2xl">
                We offer a wide range of services designed to meet diverse needs
                with quality and precision. Whether you’re seeking innovative
                ideas or dependable support, we’re committed to making your
                experience exceptional and tailored to your unique requirements.
              </p>
              <button className="p-3 text-md sm:text-2xl rounded-2xl bg-rose-500 border-0">
                About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
