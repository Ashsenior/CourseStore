import React, { useEffect, useState } from "react";
import axios from "axios";
import "../w3.css";
import { Link , useNavigate } from "react-router-dom";

export default function MemberForm(){
    // defaults
    axios.defaults.withCredentials=true;
    axios.defaults.xsrfCookieName="csrftoken";
    axios.defaults.xsrfHeaderName="X-CSRFTOKEN";
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [designation,setDesignation] = useState("");
    const [university,setUniversity] = useState("");
    const [username,setUsername] = useState("");
    const [universities,setUniversities] = useState([{}]);
    const [error,setError] = useState("");
    // methods
    const handleEmail = (e) => {setEmail(e.target.value)}
    const handleFirstName = (e) => {setFirstName(e.target.value)}
    const handleLastName = (e) => {setLastName(e.target.value)}
    const handleDesignation = (e) => {setDesignation(e.target.value)}
    const handleUniversity = (e) => {setUniversity(e.target.value)}
    const handleUsername = (e) => {setUsername(e.target.value)}

    useEffect(() => {
        const getUniversities = () => {
            const url = 'http://localhost:8000/backend/add-university/';
            axios.get(url)
                .then((response) => {
                    setUniversities(response.data);
                });
        }
        getUniversities();
    }, []);
    const handleSubmit = (e) => {
        let formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", email);
        formData.append("designation", designation);
        formData.append("university", university);
        formData.append("username", username);
        console.log(formData);
        const url = `http://localhost:8000/backend/add-member/`;
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
    <React.Fragment>
    <div className=" w3-sans-serif w3-center w3-margin" >
        <form className="form-div w3-margin " >
            <h2>Register as a Member</h2>
            { error ? <p className="w3-text-red" >{error}</p> : null}
            
            <p className=" w3-text-grey w3-left " >Your First name</p>
            <input type="text" onChange={handleFirstName} className="w3-input w3-border-black w3-round w3-border " required/>
            
            <p className=" w3-text-grey w3-left " >Your Last name</p>
            <input type="text" onChange={handleLastName} className="w3-input w3-border-black w3-round w3-border " required/>

            <p className=" w3-text-grey w3-left " >Valid Email ID for verification</p>
            <input type="email" onChange={handleEmail} className="w3-input w3-border-black w3-round w3-border " required/>
            
            <p className=" w3-text-grey w3-left " >Your designation in any project (*OPTIONAL)</p>
            <input type="text" onChange={handleDesignation} className="w3-input w3-border-black w3-round w3-border " required/>
            
            <p className=" w3-text-grey w3-left " >Username</p>
            <input type="text" onChange={handleUsername} className="w3-input w3-border-black w3-round w3-border " required/>
            <br />
            <select className="w3-select" onSelect={handleUniversity}>
                {universities.map((university) => (
                    <option className="w3-padding" value={university} >{university.name}</option>
                ) )}
            </select>
            <br />
            <br />
            <button type="button" onClick={handleSubmit} className="w3-button w3-text-white w3-round w3-hover-green but" >SUBMIT</button>
        </form>
        <br />
        <br />
    </div>
    </React.Fragment>
    );
}