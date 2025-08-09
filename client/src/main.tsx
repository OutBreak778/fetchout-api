import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
