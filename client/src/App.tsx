import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import AuthLoader from "./components/AuthLoader";

function App() {
  return (
    <div className="w-full h-full no-scrollbar">
      <BrowserRouter>
        <AuthLoader />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
