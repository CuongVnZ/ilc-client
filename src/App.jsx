import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate ,
  useLocation,
} from "react-router-dom";
import {useLayoutEffect} from 'react';
import Success from "./pages/Success";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
} 

const App = () => {
  const user = useSelector((state) => state.user.currentUser)
  // useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Wrapper>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/products/:category" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
      </Routes>
      </Wrapper>
    </Router>
  );
};

export default App;