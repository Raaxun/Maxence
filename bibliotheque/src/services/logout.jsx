export const logout = (navigate, setSession) => {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      setSession(false);
      navigate("/login");
    });
  };
  