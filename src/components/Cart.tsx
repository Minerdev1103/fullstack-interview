import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ cart, setCart }: { cart: any[], setCart: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0); 
  const [confirmDeleteItem, setConfirmDeleteItem] = useState<string | null>(null); 

  // ฟังก์ชันคำนวณราคา
  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(subtotal); // ราคาก่อนหักส่วนลด
    setGrandTotal(subtotal - discount); // ราคาหลังหักส่วนลด
  };

  // ใช้ useEffect เพื่อดึงข้อมูลจาก localStorage เมื่อหน้าโหลด
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);

  useEffect(() => {
    calculateTotal();
  }, [cart, discount]);


  // ฟังก์ชันเพิ่มหรือลดจำนวนในตะกร้า
  const updateQuantity = (title: string, quantity: number) => {
    const updatedCart = cart.map(item =>
      item.title === title ? { ...item, quantity: item.quantity + quantity } : item
    );

    // ถ้าปริมาณสินค้าเป็น 0 ให้ลบสินค้าออกจากตะกร้า
    const filteredCart = updatedCart.filter(item => item.quantity > 0);

    setCart(filteredCart);
    // อัพเดตข้อมูลใน localStorage
    localStorage.setItem('cart', JSON.stringify(filteredCart));
  };

  // ฟังก์ชันลบสินค้าจากตะกร้า
  const deleteItem = (title: string) => {
    const updatedCart = cart.filter(item => item.title !== title);
    setCart(updatedCart);
    // อัพเดตข้อมูลใน localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // ฟังก์ชันยืนยันการลบสินค้า
  const confirmDelete = (title: string) => {
    setConfirmDeleteItem(title);
  };

  // ฟังก์ชันยืนยันการลบจริง
  const handleConfirmDelete = () => {
    if (confirmDeleteItem) {
      deleteItem(confirmDeleteItem);
      setConfirmDeleteItem(null); // ปิด popup หลังจากลบสินค้า
    }
  };

  // ฟังก์ชันยกเลิกการลบสินค้า
  const handleCancelDelete = () => {
    setConfirmDeleteItem(null); // ปิด popup
  };

  // ฟังก์ชันตรวจสอบและคำนวณส่วนลดจาก discounts.json
  const applyDiscount = async () => {
    try {
      const response = await fetch('/api_mock/discounts.json'); 
      const discounts = await response.json();

      // หาส่วนลดที่ตรงกับโค้ด
      const discountData = discounts.find((discount: any) => discount.code === discountCode);

      if (discountData) {
        if (discountData.type === 'percentage') {
          const discountAmount = total * (discountData.discount / 100);
          setDiscount(discountAmount);
        } else if (discountData.type === 'amount') {
          setDiscount(discountData.discount);
        }
      } else {
        setDiscount(0); // ไม่มีส่วนลด
      }
    } catch (error) {
      console.error('Error applying discount:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {/* แสดงรายการในตะกร้า */}
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.title} className="cart-item">
            <img src={item.img} alt={item.title} />
            <div className="item-info">
              <h3>{item.title}</h3>
              <p className="price">Price: ${item.price.toLocaleString()}</p>

              {/* การจัดการปริมาณสินค้า */}
              <div className="quantity-controls">
                <button onClick={() => {
                  if (item.quantity === 1) {
                    confirmDelete(item.title); // ถ้าจำนวนสินค้าคือ 1 ให้แสดง popup ยืนยันการลบ
                  } else {
                    updateQuantity(item.title, -1); // ถ้าไม่ใช่ให้ลดจำนวนปกติ
                  }
                }}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.title, 1)}>+</button>
              </div>
            </div>

            {/* แสดงปุ่มลบเมื่อจำนวนสินค้าถึง 0 */}
            {item.quantity === 0 && (
              <button className="delete-button" onClick={() => deleteItem(item.title)}>
                Remove
              </button>
            )}
          </div>
        ))}
      </div>


      {/* Popup คอนเฟิร์มการลบสินค้า */}
      {confirmDeleteItem && (
        <div className="confirm-delete-popup">
          <p>Are you sure you want to remove {confirmDeleteItem} from your cart?</p>
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
      {/* แสดงราคาสุทธิ */}
      <div className="total-section">
        <div className="total-row">
          <p>Total:</p>
          <p className="amount">${total.toLocaleString()}</p>
        </div>
        {/* ช่องกรอกโค้ดส่วนลด */}
        <div className="discount-section">
          <p>Discount :</p>
          <input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button onClick={applyDiscount}>Apply Discount</button>
          {discount > 0 && <p> ${discount.toLocaleString()}</p>}
        </div>
        <div className="total-row">
          <p>Grand Total:</p>
          <p className="amount">${(total - discount).toLocaleString()}</p>
        </div>
      </div>

    </div>
  );
};

export default Cart;
