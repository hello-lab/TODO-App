"use client"
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { useState, useEffect } from "react";


function setCoookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}
    

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
} 

async function fetchTodos(email) {
  console.log('hey');
  const res = await fetch(`/api/todo?email=${encodeURIComponent(email)}`, {
    method: "GET",
  });
  let d = (await res.json());
  console.log(d)
  return d;
}

async function syncTodos(email, todos) {
  await fetch("/api/todo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, todos }),
  });
}


export default function Home() {
    const [todos, setTodos] = useState(JSON.parse(getCookie("todos")) || []);
  const email = getCookie("email");

  useEffect( () => {
   const illkms= async () => {
   let cookie = getCookie("todos");
   if (email!="Guest"){
   await fetchTodos(email).then(data => {
     if (data) {
       cookie = JSON.stringify(data);
     }
   });}
   console.log(cookie)
    if (cookie) {
      try {
        setTodos(JSON.parse(cookie));
      } catch {}
    }}

    illkms()
  }, []);

  useEffect(() => {
    setCoookie("todos", JSON.stringify(todos));
if (email!="Guest") {
    syncTodos(email, todos);
}
    console.log(todos)
    }, [todos]);
  return (
    <div className="font-hand grid  items-center  min-h-screen p-8  ">
      <main className="flex w-[75vw]  flex-col gap-[32px] scrollbar-hide row-start-2 items-center h-[90vh]   sm:items-start">
                <h1 className="text-8xl font-bold ">Todo List </h1>

       <ul className="overflow-x-auto w-[70vw] px-5 ">
          {todos.length > 0 ? todos.map((todo, idx) => (
            <li key={idx} className="flex flex-col mb-4 border-b pb-2">
              <div className="flex text-3xl items-center justify-between">
                <span
                  className={`cursor-pointer ${todo.done ? "line-through text-gray-400" : ""}`}
                  onClick={() => {
                    const updated = [...todos];
                    updated[idx].done = !updated[idx].done;
                    setTodos(updated);
                  }}
                >
                  {todo.text}
                  <span className="ml-2 text-xs text-gray-500">
                    {todo.timestamp ? new Date(todo.timestamp).toLocaleString() : ""}
                  </span>
                </span>
                <button
                  className="text-red-500 ml-4"
                  onClick={() => setTodos(todos.filter((_, i) => i !== idx))}
                >
                  Delete
                </button>
              </div>

              {/* === Show Note if Present === */}
              {todo.note && <p className="text-lg text-gray-700 ml-2">📝 {todo.note}</p>}

              {/* === Show Deadline if Present === */}
              {(todo.deadline && todo.deadline != 'null') && (
                <p className="text-sm text-gray-500 ml-2">
                  ⏳ Deadline: {new Date(todo.deadline).toLocaleString()}
                </p>
              )}
            </li>
          )) : (
            <li className="text-gray-500 text-4xl">No tasks available. Create a Task</li>
          )}
        </ul>
      </main>
      
    </div>
  );
}
