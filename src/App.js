import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DefaultLayout from './layouts';
import routes from './routes';

function App() {
    return (
        <Router>
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.Layout) Layout = route.layout;
                    else if (route.layout === null) Layout = Fragment;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
