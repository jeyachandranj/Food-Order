import React, { useState } from 'react';
import axios from 'axios';
import "../styles/admin.css";


const RestaurantForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',
        cuisines: '',
        rating: '',
        reviews: '',
        feature_image: '',
        thumbnail_image: '',
        menu: [{ id: '', name: '', desc: '', price: '' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMenuChange = (index, e) => {
        const { name, value } = e.target;
        const newMenu = formData.menu.slice();
        newMenu[index][name] = value;
        setFormData({ ...formData, menu: newMenu });
    };

    const addMenuItem = () => {
        setFormData({ ...formData, menu: [...formData.menu, { id: '', name: '', desc: '', price: '' }] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/restaurants', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Add Restaurant</h2>
            <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleChange} required className="form-input" />
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="form-input" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="form-input" />
            <input type="text" name="cuisines" placeholder="Cuisines" value={formData.cuisines} onChange={handleChange} required className="form-input" />
            <input type="text" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} required className="form-input" />
            <input type="text" name="reviews" placeholder="Reviews" value={formData.reviews} onChange={handleChange} required className="form-input" />
            <input type="text" name="feature_image" placeholder="Feature Image URL" value={formData.feature_image} onChange={handleChange} required className="form-input" />
            <input type="text" name="thumbnail_image" placeholder="Thumbnail Image URL" value={formData.thumbnail_image} onChange={handleChange} required className="form-input" />

            <h3 className="form-title">Menu</h3>
            {formData.menu.map((item, index) => (
                <div key={index} className="menu-item">
                    <input type="text" name="id" placeholder="ID" value={item.id} onChange={(e) => handleMenuChange(index, e)} required className="form-input menu-item-input" />
                    <input type="text" name="name" placeholder="Name" value={item.name} onChange={(e) => handleMenuChange(index, e)} required className="form-input menu-item-input" />
                    <input type="text" name="desc" placeholder="Description" value={item.desc} onChange={(e) => handleMenuChange(index, e)} required className="form-input menu-item-input" />
                    <input type="text" name="price" placeholder="Price" value={item.price} onChange={(e) => handleMenuChange(index, e)} required className="form-input menu-item-input" />
                </div>
            ))}
            <button type="button" onClick={addMenuItem} className="form-button">Add Menu Item</button>
            <button type="submit" className="form-button">Submit</button>
        </form>
    );
};

export default RestaurantForm;
