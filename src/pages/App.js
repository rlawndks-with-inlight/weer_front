import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Routes } from "react-router-dom";
import ScrollToTop from '../components/ScrollToTop';
import Headers from '../common/Headers';
import BottomMenu from '../common/BottomMenu';
import Footer from '../common/Footer';
import { zRoute } from '../routes/route';
import ScrollToTopButton from '../components/ScrollToTopButton';
import MetaTag from '../components/MetaTag';
import { useState } from 'react';
const App = () => {
    return (
        <>
            <Router>
                <Headers />
                <ScrollToTop />
                <MetaTag />
                <>
                    <Routes>
                        {zRoute.map((route, idx) => (
                            <>
                                <Route exact key={idx} path={route.link} element={route.element} />
                            </>
                        ))}

                    </Routes>
                </>
                <ScrollToTopButton />
                <BottomMenu />
                <Footer />

            </Router>
        </>
    );
}


export default App