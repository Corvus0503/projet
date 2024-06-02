import axios from "axios"
import { React, useEffect, useState } from "react";
import '../../../styles/product-card.css'
import '../../../styles/hero-section.css'
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

const Card = ({addToCart}) => {

    const [productList, setProductList] = useState([]);

    const chargerListProduct = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/produits');
          setProductList(response.data);
          console.log("data loaded");
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        chargerListProduct();
    }, []);

  return (
    <>
      <h1 className="mb-4 hero__title">Notre Menu</h1>
      <Container>
      
        <Row>
          {productList.map((product) => (
                <Col
                  lg="3"
                  md="4"
                  sm="6"
                  xs="6"
                  key={product.id}
                  className="mb-4 mt-4"
                >
                  <div className="product__item d-flex flex-column justify-content-between">
                    <div className="product__content">
                      <img 
                        className="product__img w-50" 
                        src={require(`../../../uploads/${product.photo}`)} 
                        alt="Pizza" 
                      />
                      <h5>
                        <Link to={`/productDetail/${product.id}`}>{product.nom}</Link>
                      </h5>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-between">
                      <span className="product__price mb-2">{product.prix} Ar </span>
                      <button className="addTOCART__btn" onClick={() => addToCart(product)}>
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </Col>
              ))}
        </Row>
              
            
    </Container>
    </>
    
          

    
  )
}

export default Card