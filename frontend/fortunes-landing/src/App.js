import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Wheel from './components/wheel/wheel';

function App() {
  const items = [
    {
      name: "Gummy Bears",
      weight: 10.0
    },
    {
      name: "Nothing",
      weight: 23.0
    },
    {
      name: "Laptop",
      weight: 5.0
    },
    {
      name: "Yacht",
      weight: 2.0
    },
    {
      name: "Soap",
      weight: 40.0
    },
    {
      name: "Headphones",
      weight: 20.0
    }
  ];

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
       <Wheel items={ items }/>
    </div>
  );
}

export default App;
