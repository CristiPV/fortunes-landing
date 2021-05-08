import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Wheel from './components/wheel/wheel';

function App() {
  return (
    <div className="App">
       <Wheel items={ ["red", "yellow", "green", "blue", "purple", "pink"] }/>
    </div>
  );
}

export default App;
