import React from 'react'
import { ListGroup } from "reactstrap";
import logo from "../../../images/res-logo.png";
import "../../../styles/footer.css";
import "../../../images/res-logo.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={logo} alt="logo" />
        <h5>Tasty Food</h5>
        <p>La meileur bouffe de la ville, essayez les!</p>
      </div>
      <div>
        <h5 className="footer__title mb-3">Heure d'ouverture</h5>
        <ListGroup>
          <div className="delivery__time-item border-0 ps-0">
            <span>Vendredi - Mardi</span>
            <p>10:00 - 23:00</p>
          </div>
          <div className="delivery__time-item border-0 ps-0">
            <span>Mercredi - Jeudi</span>
            <p>Off day</p>
          </div>
        </ListGroup>
      </div>
    </footer>
  )
}

export default Footer