"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";
import Image from "next/image";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <div>
      <video
        autoPlay
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/arcadeVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col items-center justify-center min-h-screen p-2 sm:p-10 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col items-center gap-8">
          <header className="absolute top-4 mt-4">
            <Image
              src="/logoCrop.png"
              alt="Your Logo"
              width={360}
              height={120}
              priority
            />
          </header>
          <Link href="/userTypePage">
            <button className="absolute inset-0 w-full h-full bg-transparent text-white text-4xl font-bold flex items-center justify-center"></button>
          </Link>
          <h1>My todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.content}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
              Review next steps of this tutorial.
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}