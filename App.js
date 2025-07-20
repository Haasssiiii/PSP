
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ExamPage from "./ExamPage";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { checkRole } from "./authUtils";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const role = checkRole(user.email);
        setUser({ ...user, role });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  if (!user) return <Login />;
  return user.role === "admin" || user.role === "owner" ? (
    <Dashboard user={user} />
  ) : (
    <ExamPage user={user} />
  );
}

export default App;
