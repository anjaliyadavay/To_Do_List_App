import React, { useState, useRef, useEffect } from "react";
import { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "./firebase";  // Correct import
import { Pencil, Trash } from "lucide-react"; // Importing icons
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const dateRef = useRef(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    const taskText = inputRef.current.value;
    const taskDate = dateRef.current.value;

    if (taskText.trim() === "" || taskDate === "") {
      alert("Enter the task and date");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        text: taskText,
        date: taskDate,
        completed: false,
      });

      setTasks([...tasks, { id: docRef.id, text: taskText, date: taskDate, completed: false }]);
      inputRef.current.value = "";
      dateRef.current.value = "";
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const editTask = async (id, index) => {
    const newTask = prompt("Edit your task", tasks[index].text);
    if (newTask) {
      try {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, { text: newTask });

        setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newTask } : task)));
      } catch (error) {
        console.error("Error updating task: ", error);
      }
    }
  };

  const toggleCompletion = async (id, index) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, { completed: !tasks[index].completed });

      setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <>
      <div className="heading">
        <h1><u><i>To Do List</i></u></h1>
      </div>
      <div className="main-container">
        <input type="text" ref={inputRef} placeholder="Enter Your Task" />
        <input type="date" ref={dateRef} />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="container">
        {tasks.length > 0 && (
          <div className="filter-section">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("pending")}>Pending</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
          </div>
        )}

        <ul className="itemlist">
          {filteredTasks.map((task, index) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id, index)}
              />
              <span className={task.completed ? "completed" : ""}>
                {task.text} ({task.date})
              </span>
              <div className="btns">
                <Pencil className="icon" onClick={() => editTask(task.id, index)} />
                <Trash className="icon" onClick={() => deleteTask(task.id)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
