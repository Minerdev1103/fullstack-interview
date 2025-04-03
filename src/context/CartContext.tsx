// CartContext.tsx
export { };  // เพิ่มบรรทัดนี้เพื่อให้ไฟล์นี้เป็นโมดูล

import React, { createContext, useState, ReactNode } from 'react';

interface Ticket {
    title: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cart: Ticket[];
    addToCart: (ticket: Ticket) => void;
    updateQuantity: (title: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Ticket[]>([]);

    const addToCart = (ticket: Ticket) => {
        setCart((prevCart) => [...prevCart, ticket]);
    };

    const updateQuantity = (title: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((ticket) =>
                ticket.title === title ? { ...ticket, quantity } : ticket
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
