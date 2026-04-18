import "./App.css";
import { Routes, Route } from "react-router-dom";

// Layout
import NotFound from "./components/layout/NotFound";

// Public pages
import LandingPage from "./pages/public/landing/LandingPage";
import PostPage from "./pages/public/post/PostPage";
import LoginPage from "./pages/public/auth/LoginPage";
import SignUpPage from "./pages/public/auth/SignupPage";
import SignupSuccessPage from "./pages/public/auth/SignupSuccessPage";

// Profile pages
import ProfilePage from "./pages/profile/ProfilePage";
import ResetPasswordPage from "./pages/profile/ResetPasswordPage";

import { useAuth } from "./context/AuthenticationContext";
import AuthenticationRoute from "./components/auth/AuthenticationRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import jwtInterceptor from "./utils/jwtIntercepter.js";
import { LoadingScreen } from "./components/ui/LodingScreen";

// Admin Page
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminSignupSuccessPage from "./pages/admin/AdminSignupSuccessPage";
import PostManagementPage from "./pages/admin/ArticleManagement/PostManagementPage";
import EditPostPage from "./pages/admin/ArticleManagement/EditPostPage";
import CreatePostPage from "./pages/admin/ArticleManagement/CreatePostPage";
import CategoryManagementPage from "./pages/admin/CategoryMangement/CategoryManagementPage";
import CreateCategoryPage from "./pages/admin/CategoryMangement/CreateCategoryPage";
import EditCategoryPage from "./pages/admin/CategoryMangement/EditCategoryPage";
import AdminProfilePage from "./pages/admin/AdminProfile/AdminProfilePage";
import AdminResetPasswordPage from "./pages/admin/AdminResetPassword/AdminResetPasswordPage";
import NotificationPage from "./pages/admin/AdminNotification/NotificationPage";

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
                userRole={state.user?.role ?? null}
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
                userRole={state.user?.role ?? null}
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
                userRole={state.user?.role ?? null}
              >
                <SignupSuccessPage />
              </AuthenticationRoute>
            }
          />

          <Route
            path="/admin/login"
            element={
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/post-managements"
                fallbackRedirectTo="/"
              >
                <AdminLoginPage />
              </AuthenticationRoute>
            }
          />

          <Route
            path="/admin/register"
            element={
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/post-managements"
                fallbackRedirectTo="/"
              >
                <AdminSignup />
              </AuthenticationRoute>
            }
          />

          <Route
            path="/admin/register/success"
            element={
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/post-managements"
                fallbackRedirectTo="/"
              >
                <AdminSignupSuccessPage />
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
                userRole={state.user?.role ?? null}
                allowedRoles={["user", "admin"]}
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
                userRole={state.user?.role ?? null}
                allowedRoles={["user", "admin"]}
              >
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/post-managements"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/login"
              >
                <PostManagementPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/post-managements/edit-post/:id"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/login"
              >
                <EditPostPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/post-managements/create-post"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/login"
              >
                <CreatePostPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/category-management"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/login"
              >
                <CategoryManagementPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/category-management/create"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/login"
              >
                <CreateCategoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/category-management/edit/:id"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/login"
              >
                <EditCategoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/login"
              >
                <AdminProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/notification"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/login"
              >
                <NotificationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/reset-password"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role ?? null}
                requiredRole="admin"
                redirectTo="/admin/login"
              >
                <AdminResetPasswordPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;

