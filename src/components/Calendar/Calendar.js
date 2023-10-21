import React, { useState } from "react";
import Calendar from "react-calendar";
import style from "./Calendar.module.css";

const MyCalendar = ({ todoList, setTodoList }) => {
  const [date, setDate] = useState(new Date()); // selected date
  const [tasks, setTasks] = useState([]);// list of tasks
  const [inputValue, setInputValue] = useState(""); //text in the input field
  const [selectedDate, setSelectedDate] = useState(null); //selected date

  // Add task to the list and send to the Airtable
  const addTask = () => {
    const updatedTasks = [...tasks, { task: inputValue, date: selectedDate }];
    setTasks(updatedTasks);

    const airtableUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    const airtableToken = process.env.REACT_APP_AIRTABLE_API_TOKEN;

    const postTitle = {
      fields: {
        title: inputValue,
        createdTime: selectedDate.toISOString(),
      },
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${airtableToken}`,
      },
      body: JSON.stringify(postTitle),
    };

    fetch(airtableUrl, options)
      .then((response) => response.json())
      .then((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.fields.title,
          createdTime: new Date(todo.createdTime),
        };
        setTodoList([...todoList, newTodo]);
      })
      .catch((error) => console.error("Error adding task:", error));

    setInputValue("");
    setSelectedDate(null);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDateClick = (value) => {
    setSelectedDate(value);
  };

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        onClickDay={handleDateClick}
        tileContent={({ date, view }) => {
          const tasksForDate = tasks.filter(
            (task) => task.date.toDateString() === date.toDateString()
          );
          return (
            <div>
              {tasksForDate.map((task) => (
                <p key={task.task}>{task.task}</p>
              ))}
              {selectedDate &&
                selectedDate.toDateString() === date.toDateString() && (
                  <div className={style.task}>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    <button onClick={addTask}>Add</button>
                  </div>
                )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default MyCalendar;
