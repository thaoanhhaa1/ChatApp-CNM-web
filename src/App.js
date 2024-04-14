import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { setSetting } from './features/localSetting/localSettingSlice';
import DefaultLayout from './layouts';
import routes from './routes';
import { localSetting } from './utils';

// [ ] Tạo nhóm
// [ ] Thêm thành viên --> TODO Notify
// [ ] Xoá thành viên
// [ ] Giải tán nhóm
// [ ] Gán quyền
function App() {
    const dispatch = useDispatch();
    const { settings } = useSelector((state) => state.localSetting);

    useEffect(() => {
        dispatch(setSetting(localSetting.get()));
    }, [dispatch]);

    useEffect(() => {
        localSetting.set(settings);
    }, [settings]);

    return (
        <Router>
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) Layout = route.layout;
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
