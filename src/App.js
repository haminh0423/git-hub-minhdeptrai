import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Category from './components/Category';
import Product from './components/ListProduct';
import Cart from './components/Cart';
import AdminPage from './components/AdminPage';
import AboutPage from './components/AboutPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/category/:id" element={<Category />} />
            <Route exact path="/product" element={<Product />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/admin" element={<AdminPage />} />
            <Route exact path="/about" element={<AboutPage />} />


          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
