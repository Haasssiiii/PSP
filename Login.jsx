import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      />
      <button onClick={() => onLogin(name)} style={{ padding: 8 }}>Login</button>
      <button style={{ padding: 8, marginLeft: 10 }}>Signup</button>
    </div>
  );
}