import React, { useState } from "react";
import Item from "../Item/Item";

function Items({ items, setItems }) {
  return (
    <div>
      {items.map((item, idx) => (
        <Item
          title={item.title}
          priority={item.priority}
          key={idx}
          id={item.id}
          setItems={setItems}
          checked={item.checked}
        />
      ))}
    </div>
  );
}

export default Items;
