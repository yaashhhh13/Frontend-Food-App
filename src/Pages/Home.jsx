import Header from "../component/Header";
import NewFood from "../component/NewFood";
import RecomendedFood from "../component/RecomendedFood";
import Service from "../component/Service";
import Service2 from "../component/Service2";
import SpecialFood from "../component/Specialfood";

const Home = () => {
  return (
    <>
      <div className="w-full overflow-x-hidden">
        <Header />
        <RecomendedFood />
        <Service />
        <NewFood />
        <Service2 />
        <SpecialFood />
      </div>
    </>
  );
};

export default Home;
