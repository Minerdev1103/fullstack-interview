import { useState, useEffect } from 'react';

// กำหนดประเภทของตั๋ว
type Ticket = {
  title: string;
  img: string;
  price: number;
};

const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/tickets.json'); // ใช้ /tickets.json ถ้าไฟล์อยู่ใน public
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
      setLoading(false);
    };
    

    fetchTickets();
  }, []);

  return { tickets, loading };
};

export default useTickets;
