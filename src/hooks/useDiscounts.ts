import { useState, useEffect } from 'react';

const useDiscounts = () => {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await fetch('/api_mock/discounts.json'); // ที่อยู่ไฟล์ JSON
      const data = await response.json();
      setDiscounts(data);
      setLoading(false);
    };

    fetchDiscounts();
  }, []);

  return { discounts, loading };
};

export default useDiscounts;
