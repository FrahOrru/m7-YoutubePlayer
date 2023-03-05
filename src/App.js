import './App.css';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      
      <div className="left-elem glass"></div>
      <div className="rigth-elem glass">
        <Dashboard></Dashboard>
      </div>
    </div>
  );
}

export default App;
