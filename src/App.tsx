import "./App.css";
import { Routes, Route } from "react-router-dom";

// Layout
import NotFound from "./components/layout/NotFound";

// Public pages
import LandingPage from "./pages/public/landing/LandingPage";
import PostPage from "./pages/public/post/PostPage";
import LoginPage from "./pages/public/auth/LoginPage";
import SignUpPage from "./pages/public/auth/SignupPage";
import SignupSuccessPage from "./pages/public/auth/SignupSuccessPage.js";

// Profile pages
import ProfilePage from "./pages/profile/ProfilePage";
import ResetPasswordPage from "./pages/profile/ResetPasswordPage";

import { useAuth } from "./context/AuthenticationContext";
import AuthenticationRoute from "./components/auth/AuthenticationRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import jwtInterceptor from "./utils/jwtIntercepter.js";
import { LoadingScreen } from "./components/ui/LodingScreen";

// Admin Page
import PostManagementPage from "./pages/admin/PostManagementPage.js";
import EditPostPage from "./pages/admin/EditPostPage";

jwtInterceptor();

function App() {
  const { isAuthenticated, state } = useAuth();

  return (
    <>
      {state.logoutLoading && <LoadingScreen />}
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/post/:id" element={<PostPage />} />

          <Route
            path="/login"
            element={
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
              >
                <LoginPage />
              </AuthenticationRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
              >
                <SignUpPage />
              </AuthenticationRoute>
            }
          />

          <Route
            path="/signup/success"
            element={
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
              >
                <SignupSuccessPage />
              </AuthenticationRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/setting/profile"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role || "user"}
                requiredRole="user"
              >
                <ProfilePage />
              </ProtectedRoute>
            }
          />


          <Route
            path="/setting/resetPassword"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role || "user"}
                requiredRole="user"
              >
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />


          <Route
            path="/admin/managements"
            element={<PostManagementPage />} />

          <Route
            path="/admin/edit-post/:id"
            element={<EditPostPage />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;

