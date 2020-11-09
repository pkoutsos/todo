import React ,{ useState,useEffect } from "react";
import './App.css';
//import components
import Form from "./components/Form";
import TodoLIst from "./components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [filteredTodos,setFilteredTodos] = useState([]);

  //run once when the app start
  useEffect(() => {
    getLocalTodos();
  },[]);


  //use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos,status]);


  //functions
  const filterHandler = () =>
  {
    switch(status)
    {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;

      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;

        default:
          setFilteredTodos(todos);
          break
    }
  }

  //save to Local
  const saveLocalTodos = () => {
      localStorage.setItem('todos',JSON.stringify(todos));
    
  };

  const getLocalTodos = () => {
    if(localStorage.getItem('todos' === null))
    {
      localStorage.setItem('todos',JSON.stringify([]));
    }
    else
    {
     let todoLocal = JSON.parse(localStorage.getItem("todos"));
     setTodos(todoLocal);
    }
   
  }
  
  return (
    <div className="App">
      <h1>
        <header>
          Panos's Todo List
        </header>
        <Form 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText} 
        inputText={inputText}
        setStatus={setStatus}
        />
        <TodoLIst  filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/>
      </h1>
      
    </div>
  );
}

export default App;
