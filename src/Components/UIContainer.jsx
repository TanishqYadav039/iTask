import React, { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { MdDelete } from "react-icons/md"
import { MdEditSquare } from "react-icons/md";

const UiContainer = () => {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState(() => {
    let item = localStorage.getItem("todos");
    return item ? JSON.parse(item) : [];
  })

  useEffect(() => {
    const item = localStorage.getItem("todos");
    if (item) {
      const todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(Todos))
  }, [Todos])

  const handleSave = () => {
    if (Todo.length === 0) { return "" }
    setTodos([...Todos, {
      id: uuidv4(),
      text: Todo,
      isCompleted: false
    }]);
    setTodo("")
  }

  const handleDelete = (e) => {
    const Id = e.target.id;
    setTodos(Todos.filter(value => value.id !== Id))
  }

  const handleEdit = (e) => {
    const Id = e.target.id;
    setTodo(e.target.value)
    setTodos(Todos.filter(value => value.id !== Id))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheck = (e) => {
    const valueId = e.target.id;
    setTodos(Todos.map(param =>
      param.id === valueId ? { ...param, isCompleted: !param.isCompleted } : param
    ))
  }

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSave()
    }
  }

  const Detail = ({ param }) => {
    return (
      <div className='h-20 md:h-10 w-full my-3 md:my-1 px-1 flex items-center justify-between'>
        <div className='flex gap-3 w-[60vw] h-full items-center md:h-10' >
          <input type="checkbox" onChange={handleCheck} id={param.id} checked={param.isCompleted}/>
          <div className={`w-[55vw] md:h-6 h-full font-medium break-words overflow-y-auto no-scrollbar ${param.isCompleted ? "line-through" : ""}`}>{param.text}</div>
        </div>
        <div className='flex flex-col md:flex-row gap-2'>
          <button className='w-16 px-6 md:py-2 py-1 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-md shadow-black cursor-pointer flex justify-center items-cente' value={param.text} onClick={handleEdit} id={param.id}><MdEditSquare /></button>
          <button className='w-16 px-6 md:py-2 py-1 rounded-full bg-red-500 hover:bg-red-400 text-white shadow-md shadow-black cursor-pointer flex justify-center items-center' onClick={handleDelete} id={param.id}><MdDelete /></button>
        </div>
      </div>
    )
  }

  return (
    <div className='md:w-[90vw] h-[83vh] mx-auto bg-violet-400 mt-4 md:rounded-2xl p-4 flex flex-col gap-4 shadow-xl shadow-black'>
      <div className='w-full h-12 bg-[#F5F5F5] flex justify-between items-center p-2 rounded-full'>
        <input type="text" className='bg-[#F5F5F5] w-3/4 h-8 rounded-full px-4 py-1 outline-red-400 border-red-400 border-2' onChange={handleChange} placeholder='Add your todo..' value={Todo} onKeyDown={handleKey} />
        <button className='py-1 px-4 ml-2 rounded-full font-medium bg-violet-500 hover:bg-violet-400 text-white shadow-md shadow-black cursor-pointer' onClick={handleSave}>Save</button>
      </div>
      <div className='w-full h-[90%] bg-[#F5F5F5] p-4 rounded-2xl overflow-y-auto no-scrollbar' >
        {Todos.map(todo => {
          return(
            <Detail param={todo} key={todo.id} />
          )
        })}
      </div>
    </div>
  )
}

export default UiContainer
