import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import SignUp from './pages/SignUp'

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path={"search"} element={<Search />} />
                    <Route path={"dashboard"} element={<Dashboard />} />
                    <Route path={"auth"} element={<Auth />} />
                    <Route path={"signup"} element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

ReactDOM.render(<App />, document.getElementById("root"))