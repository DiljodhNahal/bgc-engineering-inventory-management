import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import Test from './pages/test'
import Test2 from './pages/test2'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Test />} />
                    <Route path="login" element={<Test2 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));