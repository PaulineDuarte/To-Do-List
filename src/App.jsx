import { useState } from 'react';

import "../src/app.css";


import Todo from './components/todo';
import TodoForm from './components/todoForm';
import Search from './components/search';
import Filter from './components/filter';


function App() {
  //Dividir as funcionalidades em componentes
  //como se fosse uma chamada de API, o useStates consegue colocar os dados e consultar com os nomes das variaveis
  const[todos,setTodos] = useState([
    {
      id:1, 
      text:"Criar funcionalidade no sistema",
      category:"Trabalho",
      isCompleted:false,
    },
    {
      id:2,
      text:"Ir para a academia",
      category:"Pessoal",
      isCompleted:false,
    },
    {
      id:3,
      text:"Estudar React",
      category:"Estudos",
      isCompleted:false,
    },
  ]);

  // Função para pesquisar 
  const [search,setSearch]=useState("");

  //função do filtro 
  const [filter,setFilter]=useState("All");
  const [sort,setSort] = useState("ASC");

  //função para adicionar as tarefas 
  const addTodo = (text,category) => {
    // adiconar os novos todos 
    const newTodos = [...todos,{
      id: Math.floor(Math.random()*1000),
      text,
      category,
      isCompleted : false,
    },
    ];
    //atualizar os estados do todos 
    setTodos(newTodos);
  };

  //remover tarefas 
  const removeTodo =(id) => {
      const newTodos = [...todos]
      const filteredTodos = newTodos.filter((todo) => todo.id !==id ? todo :null);
      setTodos(filteredTodos);
    };
  
  //completar a tarefa 
  const completeTodo = (id) => {
    const newTodos =[...todos]
    newTodos.map((todo)=> todo.id === id ? (todo.isCompleted = !todo.isCompleted) :todo);
    setTodos(newTodos);
  };
  /* ClasseName todo-list vai percorrer pelo arrays dos objetos e exibir cada um 
  O metodo map consegue exibir cada um dos objetos (percorre cada um dos itens)
  map(todo) - > acessa cada um dos objetos 
  todo.text faz a interpolação de texto e retorna a propriedade que quer acessar nesse caso text*/
  return (
    <div className='app'>
     <h1>Lista de Tarefas</h1>
     <Search search={search} setSearch={setSearch}/>
     <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
     <div className="todo-list">
      {todos
      .filter((todo)=> filter ==="All" 
      ? true 
      : filter === "Completed" 
      ? todo.isCompleted : !todo.isCompleted)
      .filter((todo)=>todo.text.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      .sort((a,b)=> sort==="Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
      
      .map((todo)=>( 
        <Todo key ={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo}/>
      ))}
      </div> 
        <TodoForm addTodo={addTodo}/> 
    </div>
  );
};

export default App
