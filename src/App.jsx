import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import PublicLayout from "./ui/PublicLayout";
import Homepage from "./pages/HomePage";
import AppLayout from "./features/app/AppLayout";
import AppFunctionality from "./features/app/AppFunctionality";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ErrorPage from "./pages/ErrorPage";
import theme from "./utils/theme";
import AboutPage from "./pages/AboutUs";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* Public Layout for Homepage */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Homepage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>

        {/* App Layout for /app functionality */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<AppFunctionality />} />
        </Route>

        {/* Direct pages */}
        <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
