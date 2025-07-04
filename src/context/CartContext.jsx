import { createContext, useContext } from 'react';
import useCartLogic from '../hooks/useCartLogic';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const cart = useCartLogic();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};
