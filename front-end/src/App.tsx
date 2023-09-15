import React, { useEffect, useState, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import PageView from "./components/PageView";
import { PageProvider } from "./contexts/PageContext";
import { ChosenItemProvider } from "./contexts/ChosenItemContext";
import { CartProvider } from "./contexts/CartContext";
import { RestaurantProvider } from "./contexts/RestaurantContext";
import { OrderProvider } from "./contexts/OrderContext";
import { UserProvider } from "./contexts/UserContext";
import { TokenProvider } from "./contexts/TokenContext";
import HomePage from "./pages/HomePage";
import Unauthorized from "./pages/Unauthorized";
import OrderPage from "./pages/OrderPage";
import MenuPage from "./pages/MenuPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HistoryPage from "./pages/HistoryPage";
import BookmarksPage from "./pages/BookmarksPage";
import MapPage from "./pages/MapPage";
// const HomePage = lazy(() => import("./pages/HomePage"));
// const Unauthorized = lazy(() => import("./pages/Unauthorized"));
// const OrderPage = lazy(() => import("./pages/OrderPage"));
// const MenuPage = lazy(() => import("./pages/MenuPage"));
// const SignUpPage = lazy(() => import("./pages/SignUpPage"));
// const SignInPage = lazy(() => import("./pages/SignInPage"));
// const HistoryPage = lazy(() => import("./pages/HistoryPage"));
// const BookmarksPage = lazy(() => import("./pages/BookmarksPage"));
// const MapPage = lazy(() => import("./pages/MapPage"));

function App() {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  return (
    <BrowserRouter>
      <PageView>
        <GlobalStyle />
        <PageProvider>
          <ChosenItemProvider>
            <CartProvider>
              <RestaurantProvider>
                <OrderProvider>
                  <UserProvider>
                    <TokenProvider>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="/bookmarks" element={<BookmarksPage />} />
                        <Route path="/map" element={<MapPage lat={coords.lat} lng={coords.lng} />} />
                        <Route path="/restaurants/:profileName" element={<MenuPage />} />
                        <Route path="/restaurants/:profileName/order" element={<OrderPage />} />
                      </Routes>
                    </TokenProvider>
                  </UserProvider>
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