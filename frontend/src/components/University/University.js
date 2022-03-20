import React, { useEffect, useState } from "react";
import axios from "axios";
import "../w3.css";
import { Link , useNavigate , useParams } from "react-router-dom";
import "./University.css";

export default function University() {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    const [university,setUniversity] = useState({});
    const [projects,setProjects] = useState([]);
    const { id } = useParams();
    // methods
    useEffect(() => {
        const getUniversityAndProjects = () => {
            const url = `http://localhost:8000/backend/get-university/`;
            axios.get(url,{ params: {id:id}})
                .then((response) => {
                    setUniversity(response.data.university);
                    setProjects(response.data.projects);
                })
        }
        getUniversityAndProjects();
    },[])
    return (<React.Fragment>
        <div className="w3-container" >
            <p>{university.name}</p>
            <p>{university.website}</p>
            <p>{university.city}</p>
            <img src={ university.logo } />
            <p>{university.brief}</p>
            <p>{university.email}</p>
        </div>
        <div className="w3-container" >
            {projects[0]?projects.map((project) => (
                <div>
                    <p>{project.name}</p>
                </div>
            )):<h2>No projects</h2>}
        </div>
    </React.Fragment>);
}