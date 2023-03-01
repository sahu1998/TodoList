import React, { useState } from "react";
import TodoInput from "../TodoInput";
import AllTodoList from "../DisplayAllTask";

const Todo = () => {
  const [data, setData] = useState([]);

  const insertData = (task) => {
    console.log("------", task);
    setData([...data, task]);
    console.log("final data: ", data);
  };

  const removeTask = (index) => {
    console.log("Index No. ", index);
    const temp = data;
    temp.splice(index, 1);
    setData([...temp]);
  };

  const updateTask = (index, values) => {
    console.log("data: ", data[index]);
    let temp = data;
    temp[index] = values;
    setData(temp);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        borderRadius: "8px",
        margin: "2% auto",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        position: "relative",
        padding: "20px",
        backgroundColor: "#15558D",
      }}
    >
      <TodoInput insertData={insertData} />
      <AllTodoList
        data={data}
        removeTask={removeTask}
        updateTask={updateTask}
      />
    </div>
  );
};

export default Todo;
