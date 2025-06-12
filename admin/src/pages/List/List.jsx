import { useState, useEffect } from 'react';
import React from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/foods/list`);
      
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

const removeFood = async (foodId) => {
  const response = await axios.post(`${url}/api/foods/remove`,{id:foodId});
  await fetchList();
  if (response.data.success) {
    toast.success("Food removed successfully");
  } else {
    toast.error(response.data.message);
  }
}


  // Fetch once when component mounts
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div className= "list-table-format" key={index}>
               <img src={`${url}/images/`+item.image} alt="" />
               <p>{item.name}</p>
               <p>{item.category}</p>
               <p>{item.price}</p>
               <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        }
        )}
      </div>
    
    </div>
  );
};

export default List;
