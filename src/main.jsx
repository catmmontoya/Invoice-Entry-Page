import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from "axios"

axios.get("/invoices")
.then((res) => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App initialData={res.data.invoices} />
    </React.StrictMode>,
  );
})
.catch((error) => console.log(error))
