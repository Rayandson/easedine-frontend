import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import PageView from "./components/PageView";
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <PageView>
        <GlobalStyle/>
          <Routes>
            <Route path="/" element={<HomePage />}/>
          </Routes>
        </PageView>
    </BrowserRouter>
  );
}

export default App;