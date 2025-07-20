import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import Login from "./Login";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>📝 Online Exam Portal</h1>
      {!user ? (
        <Login onLogin={(name) => {
          localStorage.setItem("user", JSON.stringify(name));
          setUser(name);
        }} />
      ) : (
        <>
          <button onClick={handleLogout} style={{ float: "right", padding: "6px 12px" }}>Logout</button>
          <Quiz username={user} />
        </>
      )}
    </div>
  );
}