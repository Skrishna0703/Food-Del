import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';

const Add = () => {
  const [image, setImage] = useState(false);

  return (
    <div className='add'>
      <form className='flex-col'>
        {/* Image Upload */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload-preview" />
          </label>
          {/* ✅ Fixed: Missing 'e' parameter in onChange */}
          <input 
            onChange={(e) => setImage(e.target.files[0])} 
            type="file" 
            id='image' 
            hidden 
            required 
          />
        </div>

        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input type="text" name='name' placeholder='Type here' required />
        </div>

        {/* Product Description */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea name="description" rows="6" placeholder='Type here' required></textarea>
        </div>

        {/* Category and Price */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" required>
              <option value="">-- Select --</option>
              <option value="Salad">Salad</option>
              <option value="Roll">Rolls</option>
              <option value="Sandwich">Sandwich</option> {/* ✅ Spelling Fix */}
              <option value="Dessert">Dessert</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option> {/* ✅ Spelling Fix */}
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="number" name='price' placeholder='₹20' required />
          </div>
        </div>

        {/* Submit Button */}
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
