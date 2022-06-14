import 'bootstrap/dist/css/bootstrap.min.css'
import Body from './layouts/Body';
import { ParallaxProvider } from 'react-scroll-parallax';
import Capcha from './pages/Capcha.js'
// import ReCAPTCHA from "react-google-recaptcha";

function App() {
  return (
    <ParallaxProvider>
      <Body></Body>
      {/* <Capcha/> */}
    </ParallaxProvider>
  );
}

export default App;
