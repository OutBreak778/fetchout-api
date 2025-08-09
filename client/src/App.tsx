import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import AuthLoader from "./components/AuthLoader";

function App() {

  return (
    <div className="w-full h-full">
      <BrowserRouter>
      <AuthLoader />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
