import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'react-image-crop/dist/ReactCrop.css';
import { Provider } from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/shift-toward-extreme.css';
import 'tippy.js/animations/shift-toward-subtle.css';
import 'tippy.js/animations/shift-toward.css';
import 'tippy.js/dist/tippy.css';
import App from './App';
import { store } from './app/store';
import Loading from './components/loading';
import './i18n';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Suspense fallback={<Loading />}>
            <App />
        </Suspense>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
