import { useLocation, useNavigate } from "react-router-dom";

type BackFrom = "landing" | "post";

type LocationState = {
  from?: BackFrom;
};

export function useBackNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;

  // ===== Back Navigation =====
  // Responsibility: decide navigation target based on page origin
  function goBack() {
    if (state?.from === "post") {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return {
    goBack,
  };
}
