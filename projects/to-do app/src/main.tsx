import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TodoApp from "./components/TodoApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <TodoApp />
      <h1 className="mt-4 text-gray-600 font-semibold text-lg select-none text-center">
        Powered By <a href="https://chiragbhoimarshal.netlify.app" target="_blank">Marshal</a>
      </h1>
    </>
  </StrictMode>
);
