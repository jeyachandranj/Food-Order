const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors("*"));

mongoose.connect('mongodb+srv://jeyachandranj:jj.jeyan@cluster0.pe8ib.mongodb.net/food', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const menuItemSchema = new mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    price: Number
});

const restaurantSchema = new mongoose.Schema({
    id: String,
    name: String,
    address: String,
    cuisines: String,
    rating: String,
    reviews: String,
    feature_image: String,
    thumbnail_image: String,
    menu: [menuItemSchema]
});

const orderSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    total: Number,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

app.post('/api/restaurants', (req, res) => {
    const newRestaurant = new Restaurant(req.body);
    newRestaurant.save((err, restaurant) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(restaurant);
    });
});

app.get('/api/restaurants', (req, res) => {
    Restaurant.find({}, (err, restaurants) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(restaurants);
    });
});

app.delete('/api/restaurants/:id', (req, res) => {
    Restaurant.deleteOne({ id: req.params.id }, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Restaurant deleted successfully' });
    });
});

const Order = mongoose.model('Order', orderSchema);

app.post('/api/orders', async (req, res) => {
    const order = new Order(req.body);
    try {
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
