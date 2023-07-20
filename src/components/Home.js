import "../App.css";
import Header from "./Header";
import Footer from "./Foodter";
import Slider from "./Slider";

function Home() {
    return (
        <div>
            <Header />
             <Slider />
              {/* <Product /> */}
            <Footer /> 
        </div>
    );
}
export default Home;