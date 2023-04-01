import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import PageView from './components/PageView';
import { PageProvider } from './contexts/PageContext';
import { ChosenItemProvider } from './contexts/ChosenItemContext';
import { CartProvider } from './contexts/CartContext';
import HomePage from './pages/HomePage';
import Unauthorized from './pages/Unauthorized';
import RestaurantPage from './pages/RestaurantPage';
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <BrowserRouter>
      <PageView>
        <GlobalStyle />
        <PageProvider>
          <ChosenItemProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                {/* <Route path="/restaurants" element={<RestaurantPage />} /> */}
                <Route path="/restaurants/:profileName" element={<MenuPage />} />
              </Routes>
            </CartProvider>
          </ChosenItemProvider>
        </PageProvider>
      </PageView>
    </BrowserRouter>
  );
}

export default App;
