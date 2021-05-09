import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Wheel from './components/wheel/wheel';

function App() {
  const items = [
    {
      name: "Gummy Bears",
      color: "red",
      weight: 10.0
    },
    {
      name: "Nothing",
      color: "green",
      weight: 23.0
    },
    {
      name: "Laptop",
      color: "salmon",
      weight: 5.0
    },
    {
      name: "Yacht",
      color: "grey",
      weight: 2.0
    },
    {
      name: "Soap",
      color: "purple",
      weight: 40.0
    },
    {
      name: "Headphones",
      color: "olive",
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
