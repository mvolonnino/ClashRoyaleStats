import { useEffect } from "react";

import { LoginPage } from "./pages";
import { useDataLayerValue } from "./context/DataLayer";
import { auth } from "./firebase/firebase";

import "./App.css";

function App() {
  const [{ user }, dispatch] = useDataLayerValue();
  console.log({ user });

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (!user) {
          dispatch({
            type: "SET_USER",
            user: {
              email: authUser.email,
              uid: authUser.uid,
            },
          });
        }
      }
    });
  }, [user]);

  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
