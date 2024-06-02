import {React, useState} from 'react'
import '../../styles/hero-section.css'
import '../../styles/clientS.css'
import guyImg from "../../images/delivery-guy.png";
import { Container, Row, Col } from "reactstrap";
import Header from '../../components/Header';
import Home from './home/Home';
import Card from './menu/Card';
import Cart from './cart/Cart';
import TransModal from './cart/TransModal';
import Footer from './footer/Footer';
import Swal from 'sweetalert2'
import axios from "axios"


const MainDash = () => {
  const [cartItems, setCartItems] = useState([]);
  const [IsOpenNot, setIsOpenNot] = useState (false)
  const [isOpen, setIsOpen] = useState(false)
  const [supInfo, setSupInfo] = useState ({
    deliveryAddress: '' ,
    payementMode: ''
  })

  const togleNot = () => setIsOpenNot(!IsOpenNot)
  const toogleModal = () => setIsOpen(!isOpen)

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    Swal.fire(
      'Ajouté!',
      'Le produit a été ajouté dans le panier.',
      'success'
    )
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const placeOrder = () => {
    const order = {
      user: { id: 1 },  // Replace with actual user ID
      order_details: cartItems.map(item => ({ product: item, quantity: 1 })),
      totalAmount: cartItems.reduce((sum, item) => sum + item.prix, 0),
      status: 'pending',
      deliveryAddress: supInfo.deliveryAddress 
    };
    

    axios.post('http://localhost:8080/api/orders', order)
      .then(response => {
        console.log('Order placed successfully', response.data);
        Swal.fire(
          'Ajouté!',
          'Order placed successfully.',
          'success'
        )
        setCartItems([]);
        togleNot();
      })
      .catch(error => {
        console.error('There was an error placing the order!', error);
        Swal.fire(
          'Erreur!',
          'There was an error placing the order!',
          'error'
        )
      });
  }

  return (
    <div>
      <Header
        togleNot={togleNot} 
        cartItems={cartItems}
      />
      <Home 
        onClick={togleNot}
      />
      <Card 
        addToCart={addToCart}
      />
      <Cart 
        cartItems={cartItems} 
        removeFromCart={removeFromCart} 
        placeOrder={placeOrder} 
        IsOpenNot={IsOpenNot} 
        togleNot={togleNot}
        toogleModal={toogleModal} 
      />
      <TransModal
        supInfo={supInfo}
        setSupInfo={setSupInfo}
        isOpen={isOpen}
        toogleModal={toogleModal}
        placeOrder={placeOrder} 
      />
      <Footer/>
    </div>
  )
}

export default MainDash