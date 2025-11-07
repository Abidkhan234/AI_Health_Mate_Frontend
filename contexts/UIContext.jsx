import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }

    const { id, email, userName } = jwtDecode(token);

    setUserData({
      id,
      email,
      userName,
    });
  }, []);

  return (
    <UIContext.Provider
      value={{ userData, setUserData, page, setPage, sort, setSort }}
    >
      {children}
    </UIContext.Provider>
  );
};

const useUIContext = () => {
  return useContext(UIContext);
};

export default useUIContext;
