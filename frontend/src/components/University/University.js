import React, { useState } from "react";
import axios from "axios";
import "../w3.css";
import "./University.css";
import { Link , useNavigate } from "react-router-dom";

export default function UniversityForm(props){
    // defaults
    axios.defaults.withCredentials=true;
    axios.defaults.xsrfCookieName="csrftoken";
    axios.defaults.xsrfHeaderName="X-CSRFTOKEN";
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [city,setCity] = useState("");
    const [brief,setBrief] = useState("");
    const [website,setWebsite] = useState("");
    const [logo,setLogo] = useState(null);
    const [error,setError] = useState("");
    // methods
    const handleEmail = (e) => {setEmail(e.target.value)}
    const handleName = (e) => {setName(e.target.value)}
    const handleCity = (e) => {setCity(e.target.value)}
    const handleBrief = (e) => {setBrief(e.target.value)}
    const handleWebsite = (e) => {setWebsite(e.target.value)}
    const handleLogo = (e) => {setLogo(e.target.files[0])}

    const handleSubmit = (e) => {
        let formData = new FormData();
        console.log(logo);
        formData.append("logo", logo, logo.name);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("city", city);
        formData.append("website", website);
        formData.append("brief", brief);
        console.log(formData);
        const url = `http://localhost:8000/backend/add-university/`;
        axios.post(url, formData, {
            headers: {
            "content-type": "multipart/form-data",
            },
        }).then((response) => {
            if (response.status==201){
                navigate("/");
            }
            else {setError(response.data.message)}
        })
    }

    return (
    <div className=" w3-sans-serif w3-center w3-margin" >
        <form className="form-div w3-margin " >
            <h2>Add a new University/Institution</h2>
            { error ? <p className="w3-text-red" >{error}</p> : null}
            
            <p className=" w3-text-grey w3-left " >Name of the University/Institution</p>
            <input type="text" onChange={handleName} className="w3-input w3-border-black w3-round w3-border " required/>
            
            <p className=" w3-text-grey w3-left " >Valid Email ID for verification</p>
            <input type="email" onChange={handleEmail} className="w3-input w3-border-black w3-round w3-border " required/>
            
            <p className=" w3-text-grey w3-left " >City where it is Located</p>
            <input type="text" onChange={handleCity} className="w3-input w3-border-black w3-round w3-border " required/>
            
            <p className=" w3-text-grey w3-left " >Link to the Website of University/Institution</p>
            <input type="text" onChange={handleWebsite} className="w3-input w3-border-black w3-round w3-border " required/>
            <br />
            <div className="w3-container w3-padding w3-round w3-border" data-text="Select your file!">
                <input                  
                  className="file-upload-field"
                  type="file"
                  required
                  accept="image/png, image/jpeg"
                  onChange={handleLogo}
                />
            </div>
            <p className=" w3-text-grey w3-left " >A brief about the University/Institution</p>
            <textarea type="text" onChange={handleBrief} className="w3-input w3-border-black w3-round w3-border " required/>
            <br />
            <button type="button" onClick={handleSubmit} className="w3-button w3-text-white w3-round w3-hover-green but" >SUBMIT</button>
        </form>
        <br />
        <br />
    </div>
    );
}