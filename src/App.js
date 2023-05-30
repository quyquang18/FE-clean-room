import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '~/utils';

import { adminSystemMenu, userRouter, adminRouter, notLogged } from '~/routes';
import DefaultLayout from '~/layouts';
import './App.scss';
import LoadingOverlay from 'react-loading-overlay';
function App() {
    const [menuApp, setMenuApp] = useState([]);
    const user = useSelector((state) => state.user);
    const accessToken = useSelector((state) => state.user.access_token);
    useEffect(() => {
        let menu = [];
        if (user) {
            let isLoggedIn = user.isLoggedIn;
            if (isLoggedIn) {
                let role = user.userInfo.roleID;
                if (role === USER_ROLE.MANAGE_SYSTEM) {
                    menu = adminSystemMenu;
                }
                if (role === USER_ROLE.ADMIN) {
                    menu = adminRouter;
                }
                if (role === USER_ROLE.USER) {
                    menu = userRouter;
                }
            } else {
                menu = notLogged;
            }
            setMenuApp(menu);
        }
    }, [user]);
    const isShowReactLoading = useSelector((state) => state.app.isShowReactLoading);
    LoadingOverlay.propTypes = undefined;
    return (
        <LoadingOverlay active={isShowReactLoading} spinner text="please wait...">
            <Router>
                <div className="App">
                    <Routes>
                        {menuApp.length > 0 &&
                            menuApp.map((route, index) => {
                                let Layout = DefaultLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                const Page = route.component;
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
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </Router>
        </LoadingOverlay>
    );
}

export default App;
