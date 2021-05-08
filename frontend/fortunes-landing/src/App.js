import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Wheel from './components/wheel/wheel';

function App() {
  return (
    <div className="App" 
      style={ { 
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),
                          url('${process.env.PUBLIC_URL}/images/fortunes-landing-background.jpg')`,
        backgroundColor: "whitesmoke",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      } } 
    >
       <Wheel items={ ["red", "yellow", "green", "blue", "purple", "pink"] }/>
    </div>
  );
}

export default App;
