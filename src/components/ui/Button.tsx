export function LoginButton() {
  return (
    <button
      type="button"
      className="
          w-full h-[48px]
          text-body-1  
          bg-white 
          border border-brown-400 rounded-[999px] 
          hover:cursor-pointer 
          hover:text-brown-400
          active:text-brown-500
          "
    >
      Log In
    </button>
  );
}

export function SignUpButton() {
  return (
    <button
      type="button"
      className="
          w-full h-[48px] 
          text-body-1
          bg-brown-600 text-white 
          rounded-[999px] 
          hover:cursor-pointer 
          hover:bg-brown-400
          active:bg-brown-500
          "
    >
      Sign Up
    </button>
  );
}
