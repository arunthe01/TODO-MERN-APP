import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Input.css";

function Input({ setItems }) {
  const [item, setItem] = useState({
    title: "",
    priority: "Important",
    checked: false,
    id: localStorage.getItem("ID"),
  });

  function changeHandler(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    await axios.post("http://localhost:4000/add", { data: item });
    const data = await axios.post("http://localhost:4000/data");
   
    setItems(data.data);
    var current_id = localStorage.getItem("ID");
    localStorage.setItem("ID", ++current_id);
    setItem({
      title: "",
      priority: "Important",
      checked: false,
      id: localStorage.getItem("ID"),
    });
  }

  return (
    <div className="input-div">
      <input
        type="text"
        value={item.title}
        className="input-text"
        name="title"
        onChange={changeHandler}
      />

      <div className="options">
        <select
          name="priority"
          id="cars"
          className="opt"
          onChange={changeHandler}
        >
          <option value="Important">Important</option>
          <option value="Very Important">Very Important</option>
          <option value="Reminder">Reminder</option>
        </select>
        <button className="add" onClick={submitHandler}>
          +
        </button>
        
      </div>
    </div>
  );
}

export default Input;
