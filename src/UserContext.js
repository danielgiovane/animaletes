import React from "react";
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from "./api";
import { Navigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  };

  const userLogin = async (username, password) => {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: usuario ou senha errado`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
      <Navigate to="/conta" />;
    } catch (error) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = React.useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
    setLogin(false);
    window.localStorage.removeItem("token");
    <Navigate to="/login" />;
  }, []);

  React.useEffect(() => {
    const autoLogin = async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setLoading(true);
          setError(null);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token invalido");
          await getUser(token);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    };
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, data, userLogout, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
