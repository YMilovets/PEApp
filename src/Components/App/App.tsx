import { ErrorBoundary } from "react-error-boundary";
import { HashRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../../Pages/NotFoundPage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ExercisesList from "../ExercisesList/ExercisesList";
import Layout from "../Layout";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ErrorBoundary
                FallbackComponent={ErrorMessage}
              >
                <ExercisesList search="" />
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

