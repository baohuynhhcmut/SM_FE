import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/User'; // Import the Layout component
import HomePage from './Pages/home';  // Import Product page component
import Shop from './Pages/shop';
import FarmDetail from './Pages/Farm Detail';
import ScrollToTop from './utils/scrollTop';
import ProductDetail from './Pages/Product Detail';
import LoginUser from './Pages/User Login';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthWrapper';
import ProductFarm from './Pages/Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>

    <AuthProvider>
    <ToastContainer /> 
      <Router>
         <ScrollToTop />
          <Routes>
            {/* Main layout with nested routes */}
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<LoginUser />} />
              <Route path='/farm' element={<HomePage />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/farm/:id' element={<FarmDetail />} />
              <Route path='/product/:id' element={
                <ProtectedRoute>
                <ProductDetail />
                </ProtectedRoute>
              }
              />
              <Route path='/product' element={<ProductFarm />} />
            </Route>
          </Routes>
        </Router>
    </AuthProvider>
  </>
  );
};

export default App;