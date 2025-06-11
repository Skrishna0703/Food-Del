import { useState, useEffect } from 'react';
import React from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/foods/list`);
      console.log(response);
      if (response.data.success) {
        setList(response.data.foods);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch food list.");
    }
  };

  // Fetch once when component mounts
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
        
        </div>

      </div>
    
    </div>
  );
};

export default List;
