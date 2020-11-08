import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    console.log("useEffect 발생");
    authService.onAuthStateChanged((user) => {
      if (user) {
        // 아래 코드의 경우 authService.currentUser 의 크기가 매우큰 오브젝트의 경우 리액트에서 변경사항을 찾는데 장애가 있을수 있다.
        // setUserObj(authService.currentUser);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    // 아래 코드의 경우 authService.currentUser 의 크기가 매우큰 오브젝트의 경우 리액트에서 변경사항을 찾는데 장애가 있을수 있다.
    // setUserObj(authService.currentUser);
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing....."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
