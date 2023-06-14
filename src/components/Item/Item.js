import React from "react";
import axios from "axios";
import "./Item.css";

function Item({ title, priority, id, setItems, checked }) {
  async function delItem() {
    console.log(id);
    await axios.post("http://localhost:4000/del", { id: id });
    const data = await axios.post("http://localhost:4000/data");
    setItems(data.data);
  }
  async function changeHandler(e) {
    await axios.post("http://localhost:4000/update", {
      id: id,
      checked: e.target.checked,
    });
    const data = await axios.post("http://localhost:4000/data");
    console.log(data.data);
    setItems(data.data);
  }
  return (
    <div
      className="item"
      style={{
        backgroundColor:
          priority == "Important"
            ? "tomato"
            : priority == "Very Important"
            ? "red"
            : "cyan",
      }}
    >
      <p
        className="title"
        style={{ textDecoration: checked && "line-through" }}
      >
        {title}
      </p>
      <div className="d-flex">
        <input
          type="checkbox"
          className="checkbox"
          onChange={changeHandler}
          checked={checked}
        />
        <button onClick={delItem} className="del">
          Del
        </button>
      </div>
    </div>
  );
}

export default Item;
