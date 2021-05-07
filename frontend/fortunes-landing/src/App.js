import './App.css';

import Wheel from './components/wheel/wheel';

function App() {
  return (
    <div className="App">
       <Wheel items={ ["red", "yellow", "green", "blue", "purple", "pink"] }/>
    </div>
  );
}

export default App;
