import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FormSinhVien from './BaiTapQuanLySinhVien/FormSinhVien';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Template from './Template/Template';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Template />}>
          <Route path='quanlisinhvien' element={<FormSinhVien />}></Route>
          <Route path='' element={<Navigate to="quanlisinhvien" />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
