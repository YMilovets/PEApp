import { Outlet } from "react-router-dom";
import Header from "../Header";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Layout() {
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Outlet />
      </ErrorBoundary>
    </>
  );
}

export default Layout;
