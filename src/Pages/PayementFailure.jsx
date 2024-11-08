import { Link } from "react-router-dom";

const PaymentFailure = () => {
  return (
    <>
      <div className="pay-failure">
        <section className="relative z-10 bg-primary py-[120px]">
          <div className="container mx-auto">
            <div className="-mx-4 flex">
              <div className="w-full px-4">
                <div className="mx-auto max-w-[400px] text-center">
                  <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                    404
                  </h2>
                  <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                    Oops! Payment unsuccessfull
                  </h4>
                  <p className="mb-8 text-lg text-white">
                    If any amount debited will be refunded within 3-5 working days 
                  </p>
                  <Link
                    to='/'
                    className="active:scale-90 transition duration-150 hover:scale-105 py-2 px-5 rounded-full text-lg cursor-pointer bg-rose-500 border-0"
                  >
                    Go To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
            <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
            <div className="flex h-full w-1/3">
              <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
              <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
            </div>
            <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
          </div>
        </section>
      </div>
    </>
  );
};


export default PaymentFailure