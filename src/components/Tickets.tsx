import React, { useState } from 'react';
import useTickets from '../hooks/useTickets';
import './Tickets.css';

const Tickets = ({ setCart }: { setCart: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const { tickets, loading } = useTickets();
  const [searchTerm, setSearchTerm] = useState(''); // สำหรับเก็บค่าคำค้นหา
  const [filteredTickets, setFilteredTickets] = useState(tickets); // สำหรับเก็บตั๋วที่กรองแล้ว

  // ฟังก์ชันเพิ่มตั๋วลงในตะกร้า
  const addToCart = (ticket: any) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    // เช็คว่ามีสินค้านี้ในตะกร้าหรือยัง
    const ticketExists = existingCart.find((item: any) => item.title === ticket.title);

    if (!ticketExists) {
      ticket.quantity = 1; // กำหนดจำนวนสินค้าเริ่มต้นเป็น 1
      existingCart.push(ticket); // เพิ่มสินค้าใหม่ลงในตะกร้า
      setCart(existingCart); // อัพเดต cart state
      localStorage.setItem('cart', JSON.stringify(existingCart)); // เก็บข้อมูลใน localStorage
    }
  };

  // ฟังก์ชันสำหรับจัดการการค้นหา
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // กรองตั๋วที่ชื่อสถานที่ตรงกับคำค้นหา
    const filtered = tickets.filter(ticket => ticket.title.toLowerCase().includes(value.toLowerCase()));

    // จัดลำดับให้รายการที่ค้นหาพบขึ้นมาเป็นอันดับแรก
    const sortedTickets = filtered.sort((a, b) => {
      if (a.title.toLowerCase().includes(value.toLowerCase())) return -1; // ถ้าตรงกับคำค้นหาจะให้ขึ้นก่อน
      return 1;
    });

    setFilteredTickets(sortedTickets);
  };

  if (loading) return <div className="loading">Loading tickets...</div>;

  return (
    <div>
      <div className="tickets-container">
        <h2 className="tickets-header">Tickets</h2>
        {/* Input Search สำหรับค้นหาชื่อสถานที่ */}
        <input
          type="text"
          className="search-input"
          placeholder="Search for tickets..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {tickets.map((ticket) => (
          <div key={ticket.title} className="ticket-card">
            <img src={ticket.img} alt={ticket.title} />
            <div className="ticket-info">
              <h3>{ticket.title}</h3>
              <p className="price">${new Intl.NumberFormat().format(ticket.price)}</p>
              <button className="add-button" onClick={() => addToCart(ticket)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
