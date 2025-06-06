import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import { Routes , Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import Cart from './pages/Cart';
import LogoutPage from './pages/LogoutPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path='/products' element={<Products/> } />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
