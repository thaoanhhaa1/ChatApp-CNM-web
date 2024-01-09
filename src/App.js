import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from './routes';

function App() {
    return (
        <Router>
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.component;

                    return <Route key={index} path={route.path} element={<Page />} />;
                })}
            </Routes>
        </Router>
    );
}

export default App;
