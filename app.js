import { Routes, Route } from "react-router-dom";
import SigninPage from "./Pages/SinginPage";
import SignupPage from "./Pages/SingupPage";
import TodoPage from "./Pages/TodoPage";
import isUser from "./hoc/isUser";

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!option) {
        navigate("/todo");
      }
    } else {
      if (option) {
        navigate("/signin");
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/todo" element={<AuthTodoPage />} />
    </Routes>
  );
}

export default App;
