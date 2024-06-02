import React from 'react'
import { Container, Row, Col } from "reactstrap";
import '../../../styles/cart-page.css'
import '../../../styles/sideCart.css'
import '../../../styles/product-card.css'

const bDtyle = {
  backgroundColor : "rgba(255, 255, 255, 0",
  borderColor : "rgba(255, 255, 255, 0",
  borderStyle : "solid",
  color : "white"
}

const Cart = ({ cartItems, removeFromCart, placeOrder, IsOpenNot, togleNot, toogleModal }) => {

  const total = cartItems.reduce((sum, item) => sum + item.prix, 0);

  return (
    <div className={`Comments ${IsOpenNot ? "" : "open"}`}>
      <h2>Panier</h2>
      <ul>
      <Container>
          <Row>
            <Col lg="12">
            <div className="Comments-list">
              {cartItems.map((item, index) => (
                          <div key={index} className="Comment">
                          <div className="Comment-header">
                            <div className="Comment-avatar">
                              <img src={require(`../../../uploads/${item.photo}`)} alt="" />
                            </div>
                            <span className="Comment-author">
                              {item.nom}
                            </span>
                            <span className="Comment-time" >{item.nom}<button style={bDtyle} onClick={() => removeFromCart(index)} >X</button></span>
                          </div>
                    
                          <div className="Comment-body">{item.prix} </div>
                        
                      </div>
                      
                      ))}
            </div>
            
            </Col>
          </Row>
        </Container>
      
        
      </ul>
      <h3>Total: {total} Ar</h3>
      <button className="addTOCART__btn" onClick={toogleModal}>Envoyer Commande</button>
    </div>
  )
}

export default Cart