import React, { useEffect, useState } from "react";
import axios from "axios";
import "../w3.css";
import { Link , useNavigate } from "react-router-dom";
import "./University.css";

export default function Universities() {
    // defaults
    const [universities,setUniversities] = useState([]);
    // methods
    useEffect(() => {
        const getUniversities = () => {
            const url = 'http://localhost:8000/backend/add-university/';
            axios.get(url)
                .then((response) => {
                    setUniversities(response.data);
                })
        }
        getUniversities();
    },[])

    return (<React.Fragment>
        <div className="w3-center w3-margin w3-sans-serif w3-padding" >
            <h2 className="w3-text-blue" >Universities / Institutions</h2>
        </div>
        <div className="w3-middle" >
        {universities.map((university) => (
            <div className="w3-border w3-half w3-margin w3-round" >
                <section className="w3-left w3-padding " >
                    <a style={{ textDecoration: 'none' }} href={university.website} >{university.name}</a>
                </section>
                <section className="w3-blue w3- w3-padding w3-fourth w3-round w3-right " >
                    <Link style={{ textDecoration: 'none' }} to={`/university/${university.id}`} >View</Link>
                </section>
            </div>
        ))}
        </div>
    </React.Fragment>);
}