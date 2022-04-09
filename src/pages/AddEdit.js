import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, } from "react-router-dom";
import './AddEdit.css';
import axios from 'axios';
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};


const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email, contact } = state;
  let navigate = useNavigate();
  
  const addState = async (data) =>{
    const response = await axios.post("http://localhost:5000/users", data);
    if(response.status === 200){
      toast.success("User added successfully");
    }
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    if(!name || !email || !contact){
      toast.error("Please provide value for each input boxes");
    }else{
      addState(state);
      setTimeout(() => navigate("/"), 1000);      
    }

  };
  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setState({...state, [name] : value});
  };
  return (
    <div className="Wrapper">
      <div style={{ marginTop: "100px" }}>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxwidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name = "name"
            placeholder="Enter name"
            onChange={handleInputChange}
            value={name}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name = "email"
            placeholder="Enter email..."
            onChange={handleInputChange}
            value={email}
          />
          <label htmlFor="contacts">Contacts</label>
          <input
            type="text"
            id="contact"
            name = "contact"
            placeholder="Enter Contact..."
            onChange={handleInputChange}
            value={contact}
          />
          <input type="submit" value="submit"/>
        </form>
      </div>
    </div>
  );
};

export default AddEdit;
