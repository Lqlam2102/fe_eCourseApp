import 'bootstrap/dist/css/bootstrap.min.css'
import Body from './layouts/Body';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
  return (
    <ParallaxProvider>
      <Body></Body>
    </ParallaxProvider>
  );
}

export default App;
