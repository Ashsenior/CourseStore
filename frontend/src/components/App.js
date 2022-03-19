import React from 'react';
import {render} from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Home/HomePage';
import MemberForm from './Member/Member';
import UniversityForm from './university/University';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/university-form' element={<UniversityForm />} />
                <Route path='/member-form' element={<MemberForm />} />
            </Routes>
        </Router>
    );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);