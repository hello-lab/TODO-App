"use client"
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { TimeInput } from "@heroui/date-input";
import { Time } from "@internationalized/date";
import {toast } from  "react-hot-toast"
//Gemini
import {
  GoogleGenAI,
  Type,
} from '@google/genai';

async function Gemini(text1) {
  const ai = new GoogleGenAI({
    apiKey:"AIzaSyDuuACtngj7dDhsx6KYCp3MAcB2aLKUVy8"
  });
  const config = {
    mediaResolution: 'MEDIA_RESOLUTION_LOW',
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      required: ["todos"],
      properties: {
        todos: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ["text", "deadline", "note", "timestamp", "done"],
            properties: {
              text: {
                type: Type.STRING,
              },
              deadline: {
                type: Type.STRING,
              },
              note: {
                type: Type.STRING,
              },
              timestamp: {
                type: Type.STRING,
              },
              done: {
                type: Type.BOOLEAN,
              },
            },
          },
        },
      },
    },
    systemInstruction: [
        {
          text: `your work is to parse data given to u into todo list tasks , text should be the title the rest are self explainatory, if the user doesnt not specify deadline use null datatype in its place. deadline and timestamp should be in js new date format, you can research and create detailed multiple todos task based on what the user wants, timestamp should be ${new Date()}

`,
        }
    ],
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: text1,
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  }).then((response) => {
    const result = response.text;
    console.log(JSON.parse(result).todos);

    return (JSON.parse(result));
  });
  return response
}

// --- Enhanced Cookie Helpers ---
function setCookie(name, value, days = 365) {
  try {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    // Prevent very large values (cookies have ~4KB limit)
    if (value.length < 4000) {
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
    } else {
      // If too large, clear cookie
      document.cookie = `${name}=; expires=${expires}; path=/; SameSite=Lax`;
    }
  } catch (err) {
    console.error("Failed to set cookie:", err);
  }
}

function getCookie(name) {
  const cookies = document.cookie.split(";").map(c => c.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

function safeParseTodos(data) {
  try {
    const parsed = JSON.parse(data);
    // Only accept arrays of valid todo objects
    if (Array.isArray(parsed)) {
      return parsed.filter(
        t =>
          typeof t === 'object' &&
          t !== null &&
          'text' in t &&
          'note' in t &&
          'done' in t &&
          'timestamp' in t &&
          'deadline' in t
      );
    }
    return [];
  } catch {
    return [];
  }
}

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Time(new Date().getHours(), new Date().getMinutes()));
  const [calendar, setCalendar] = useState(false);

  // --- Improved Load ---
  useEffect(() => {
    const cookie = getCookie("todos");
    if (cookie) {
      setTodos(safeParseTodos(cookie));
    }
  }, []);

  // --- Improved Save ---
  useEffect(() => {
    // Only save valid todos
    if (todos.length !== 0) {
      const filteredTodos = safeParseTodos(JSON.stringify(todos));
      setCookie("todos", JSON.stringify(filteredTodos));
    }
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
        <h1 className="text-8xl font-bold mb-4">Todo App Ai </h1>

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
            }
          }}
        >
          <div className="flex flex-col w-[70vw] gap-2">
            <span className="text-3xl">Full Task(s) Description :</span>
            <textarea
              className="border rounded text-2xl px-2 py-1 min-h-[100px]"
              placeholder="Type all your tasks here with deadlines notes etc, ai will parse it..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={async () => {
              toast.promise(
                Gemini(note).then((response) => {
                  // Only merge valid todos
                  setTodos([
                    ...todos,
                    ...safeParseTodos(JSON.stringify(response.todos))
                  ]);
                }),
                {
                  loading: 'Processing...',
                  success: <b>Tasks added!</b>,
                  error: <b>Could not add tasks.</b>,
                }
              );
            }}
            className="bg-primary text-white px-4 py-2 flex items-center text-5xl rounded"
          >
            ✓
          </button>
        </form>
      </main>
    </div>
  );
}