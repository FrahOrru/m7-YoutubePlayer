import './App.css';
import Dashboard from './components/dashboard/dashboard';
import SideBar from './components/sideBar/sideBar';

function App() {
  return (
    <div className="App">
      
      <div className="left-elem glass">
        <SideBar></SideBar>
      </div>
      <div className="rigth-elem glass">
        <Dashboard></Dashboard>
      </div>
    </div>
  );
}

export default App;
