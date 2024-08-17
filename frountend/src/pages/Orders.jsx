import React from 'react';
import '../styles/OrderStyle.css';
import Menu from '../components/Menu';
import data from '../data/data.json';
import MyCart from '../components/MyCart';
import axios from 'axios';

class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            list: data,
            id: '',
            newList: [],
            price: '',
            name: [],
            total: 0,
            quantity: 0,
            clickable: false
        };
    }

    componentWillMount() {
        const hotel = this.props.history.location.pathname.slice(7);
        const List = this.state.list.filter((rec) => rec.name === hotel);
        this.setState({
            id: hotel,
            newList: List
        });
    }

    childHandler = (ChildPrice, ChildName, ChildQuantity) => {
        const names = this.state.name;
        names.push(ChildName);
        this.setState({
            price: ChildPrice,
            name: names,
            quantity: ChildQuantity + 1,
            clickable: true
        });
    };

    incrementQuantity = (incQuan) => {
        this.setState({
            quantity: incQuan + 1
        });
    };

    decrementQuantity = (decQuan) => {
        if (this.state.quantity >= 1) {
            this.setState({
                quantity: decQuan - 1
            });
        }
    };

    total = (p, q) => {
        this.setState({
            total: p * q
        });
    };

    handlePlaceOrder = () => {
        const order = {
            name: this.state.name.join(', '),
            price: this.state.price,
            quantity: this.state.quantity,
            total: this.state.total
        };
        axios.post('https://food-order-1-qd6t.onrender.com/api/orders', order)
            .then(response => {
                alert('Order placed successfully');
            })
            .catch(error => {
                console.error('There was an error placing the order!', error);
            });
    };

    render() {
        return (
            <div>
                <div className="nav">
                    <div id="logo">
                        <h2>FOOD COURT</h2>
                    </div>

                    <div id="user">
                        <div className="name">Hello, jeyan</div>
                        <div className="profile"></div>
                    </div>
                </div>

                <div id="content">
                    <div id="head">
                        <h1 className='hname'>{this.state.newList.map(x => x.name)}</h1>
                        <h5 className='aname'><i className="fa fa-map-marker" style={{ fontSize: 18 }}></i> {this.state.newList.map(x => x.address)}</h5>
                        <div id='items'>
                            <center><h2>Order Now</h2></center>
                            <br />
                            {this.state.newList.map(
                                x => x.menu.map(item => <Menu
                                    id={item.id}
                                    desc={item.desc}
                                    price={item.price}
                                    name={item.name}
                                    action={this.childHandler} />)
                            )}
                        </div>
                    </div>
                    <div id="panel">
                        <div id="logo"></div>
                        <div id="right">
                            <div id="right-in">
                                <h4>My Cart</h4>
                                {this.state.clickable &&
                                    <div>
                                        <MyCart
                                            name={this.state.name}
                                            price={this.state.price}
                                            quantity={this.state.quantity}
                                            increment={this.incrementQuantity}
                                            decrement={this.decrementQuantity}>
                                        </MyCart>
                                    </div>
                                }
                                <div id="total">
                                    <p id="total" style={{ marginRight: "100px" }}> Total amount:
                                        <span className="spn">{'\u20B9'}  {this.state.total}</span>
                                    </p>
                                    <input id="pay" type="button" value="Calculate"
                                        onClick={() => this.total(this.state.price, this.state.quantity)} />
                                    <br />
                                    <input id="pay" type="button" value="Place Order" onClick={this.handlePlaceOrder} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Orders;
