import { createContext, useEffect, useState } from "react";
import ProductsAPI from "./api/ProductApi";
import UserAPI from "./api/UserApi";
import CategoriesAPI from "./api/CategoryApi";
import io from "socket.io-client";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const API_URL = 'http://localhost:3000/shopping/';
  const API_ONLY_HREF = 'shopping/';
  useEffect(() => {
    // socketio
    // const socket = io("https://picture-selling.vercel.app/");
    var connectionOptions = {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    const socket = io("https://picture-selling.vercel.app/", connectionOptions);
    setSocket(socket);
    return () => socket.close();
  }, []);

  const state = {
    productsAPI: ProductsAPI(),
    categoriesAPI: CategoriesAPI(),
    userAPI: UserAPI(),
    socket,
    API_URL,
    API_ONLY_HREF
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
