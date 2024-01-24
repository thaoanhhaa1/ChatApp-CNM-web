import React from 'react';
import ReactDOM from 'react-dom/client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/shift-toward-extreme.css';
import 'tippy.js/animations/shift-toward-subtle.css';
import 'tippy.js/animations/shift-toward.css';
import 'tippy.js/dist/tippy.css';
import App from './App';
import './i18n';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
