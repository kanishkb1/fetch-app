import './App.css';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Login from './pages/Login'
import Search from './components/Search';
import Home from './pages/Home';
//import Home from './pages/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Home" element={<Home/>} />
      
      </Routes>
    </BrowserRouter>
  );
}
export default App;


