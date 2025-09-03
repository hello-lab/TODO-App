"use client"
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { TimeInput } from "@heroui/date-input";
import { Time } from "@internationalized/date";
import {toast} from "react-hot-toast"











// === Cookie helpers ===
function setCookie(name, value, days = 365) {
if (typeof document !== 'undefined') {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}}

function getCookie(name) {
if (typeof document !== 'undefined') {  
const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;}
else return null
}

export default function Home() {
  const [todos, setTodos] = useState(JSON.parse(getCookie("todos")) || []);
  const [input, setInput] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Time(new Date().getHours(), new Date().getMinutes()));
  const [calendar, setCalendar] = useState(false);

  // === Load todos from cookie ===
  useEffect(() => {
    const cookie = getCookie("todos");
    if (cookie) {
      try {
        setTodos(JSON.parse(cookie));
      } catch {}
    }
  }, []);

  // === Save todos to cookie whenever todos change ===
  useEffect(() => {
    setCookie("todos",  JSON.stringify([...todos]));
  }, [todos]);
  function setDatee(datee) {
    setDate(datee);
    setCalendar(false);
  }

  function toggleCall() {
    setCalendar(!calendar);
  }

  return (
    <div className="font-hand grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-[length:100%_2.5rem] bg-[linear-gradient(to_bottom,transparent_95%,#d1d5db_95%)]">
      <div className="fixed translate-x-[-40vw] bg-red-500 h-[100vh] w-[0.2rem]"></div>

      <main className="flex flex-col gap-[32px] h-[100%] w-[100%] row-start-2 items-center sm:items-start">
        <h1 className="text-8xl font-bold mb-4">Todo App</h1>

        <form
          className="flex flex-col gap-4 items-center mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              const deadline = date
                ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hour, time.minute)
                : null;

              setTodos([
                ...todos,
                { text: input, note, done: false, timestamp: Date.now(), deadline },
              ]);

              setInput("");
              setNote("");
              toast.success("Task Added")
            }
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-4xl">Title:</span>
            <input
              type="text"
              className="border rounded w-[50vw] text-5xl px-2 py-1"
              placeholder="Add a todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 flex items-center text-5xl rounded"
            >
              ✓
            </button>
          </div>
<div className="flex items-center justify-start gap-2 translate-y-[10px] w-[100%]">
            <span className="text-4xl">Deadline:</span>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDatee}
              className={`rounded-lg border shadow-xl absolute ${calendar ? "" : "hidden"}`}
            />
            <input
              type="text"
              className="border rounded w-[10vw] font-no-bold text-2xl px-2 py-1"
              value={date ? date.toLocaleDateString() : ""}
              readOnly
            />
            <button type="button" onClick={toggleCall} className="text-3xl">
              📅
            </button>
            <TimeInput
              className="text-2xl"
              value={time}
              onChange={(newTime) => setTime(newTime)}
            />
          </div>
          <br/>
          <div className="flex flex-col w-[100%] gap-2">
            <span className="text-3xl">Note:</span>
            <textarea
              className="border rounded text-2xl px-2 py-1 min-h-[100px]"
              placeholder="Add a note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          
        </form>

        
      </main>
    </div>
  );
}
