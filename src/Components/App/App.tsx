import { HashRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../../Pages/NotFoundPage";
import ExercisesList from "../ExercisesList/ExercisesList";
import Layout from "../Layout";
import Exercise from "../../Pages/Exercise";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ExercisesList />} />
          <Route path="exercise/:id" element={<Exercise />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

