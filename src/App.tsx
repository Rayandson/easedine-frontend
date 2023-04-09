import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import PageView from './components/PageView';
import { PageProvider } from './contexts/PageContext';
import { ChosenItemProvider } from './contexts/ChosenItemContext';
import { CartProvider } from './contexts/CartContext';
import HomePage from './pages/HomePage';
import Unauthorized from './pages/Unauthorized';
import OrderPage from './pages/OrderPage';
import MenuPage from './pages/MenuPage';
import { RestaurantProvider } from './contexts/RestaurantContext';
import { OrderProvider } from './contexts/OrderContext';

function App() {
  return (
    <BrowserRouter>
      <PageView>
        <GlobalStyle />
        <PageProvider>
          <ChosenItemProvider>
            <CartProvider>
              <RestaurantProvider>
                <OrderProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                {/* <Route path="/restaurants" element={<RestaurantPage />} /> */}
                <Route path="/restaurants/:profileName" element={<MenuPage />} />
                <Route path="/restaurants/:profileName/order" element={<OrderPage />} />
              </Routes>
              </OrderProvider>
              </RestaurantProvider>
            </CartProvider>
          </ChosenItemProvider>
        </PageProvider>
      </PageView>
    </BrowserRouter>
  );
}

export default App;
