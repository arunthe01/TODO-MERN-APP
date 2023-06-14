import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Heading from "./components/Heading/Heading";
import Items from "./components/Items/Items";
import { useEffect, useState } from "react";
import Input from "./components/Input/Input";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await axios.post("http://localhost:4000/data");
      setItems(data.data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Heading />
      <Input setItems={setItems} />
      <Items items={items} setItems={setItems}/>
    </div>
  );
}

export default App;
