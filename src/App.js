import './App.css';
import Login from './Screens/Login'
import Inventory from './Screens/Inventory'
import { useSelector } from 'react-redux'
function App() {
  const { token } = useSelector(state => state.auth);
  if(!token){
    return (
      <div className="app">
        <div className="safe-area">
        <Login />
        </div>
        
      </div>
    );
  }
  else{
    return(
      <div className="app">
      <div className="safe-area">
        <Inventory/>
      </div>
    </div>
    )
  }
  
}

export default App;
