import React from 'react';
import {render} from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Home/HomePage';
import MemberForm from './Member/Member';
import UniversityForm from './University/UniversityForm';
import Universities from './University/Universities';
import University from './University/University';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/university-form' element={<UniversityForm />} />
                <Route path='/member-form' element={<MemberForm />} />
                <Route path='/universities' element={<Universities />} />
                <Route path='/university/:id' element={<University />} />
            </Routes>
        </Router>
    );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);