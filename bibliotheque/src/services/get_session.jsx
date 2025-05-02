export const getSession = async () => {
  const response = await fetch("http://localhost:3000/session", {
    method: "POST",
    credentials: "include",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return false;
  } else {
    const isAbonne = await fetch("http://localhost:3000/isAbonne", {
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const session = await response.json();
    const res = await isAbonne.json();

    return {
      ...session,
      isAbonne: res.isAbonne,
    };
  }
};
