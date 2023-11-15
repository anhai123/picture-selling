import React, { useEffect, useState } from "react";
import userService from "../services/user.service";
import paymentService from "../services/payment.service";
const user = JSON.parse(localStorage.getItem("user"));
const UserAPI = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        try {
          const response = await userService.getUser(user.id);

          setUserInfo(response);
          setIsLogged(true);
          user.roles.includes("ROLE_ADMIN")
            ? setIsAdmin(true)
            : setIsAdmin(false);
          setCart(response.cart);
          console.log(response);
        } catch (error) {
          alert(error);
        }
      };
      getUser();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const getHistory = async () => {
        if (isAdmin) {
          const response = await paymentService.getPayment();
          setHistory(response);
        } else {
          const response = await userService.getUserHistory(user.id);
          setHistory(response);
        }
      };
      getHistory();
    }
  }, [user, isAdmin, callback]);

  const addCart = async (product) => {
    if (!isLogged) {
      return alert("Please login to continue buying");
    }

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await userService.patchItemInCart(user.id, cart);
    } else {
      alert("This product has been added to cart.");
    }
  };

  return {
    userInfo: [userInfo, setUserInfo],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    callback: [callback, setCallback],
    history: [history, setHistory],
  };
};

export default UserAPI;
