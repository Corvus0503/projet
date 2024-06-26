import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "reactstrap";
import logo from "../images/res-logo.png";
import CardBtn from "../images/shopping_cart_25px.png";
import "../styles/header.css";
import { NavLink, Link } from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";

const nav__links = [
  {
    display: "Accueil",
    path: "/home",
  },
  {
    display: "Cartes",
    path: "/cartes",
  },
];
const Header = ({ togleNot, cartItems }) => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  // const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  // const dispatch = useDispatch();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  let navigate = useNavigate();

  const toggleCart = () => {
    // dispatch(cartUiActions.toggle());
  };

  console.log(menuRef?.current?.classList.value);

  useEffect(() => {
    // window.addEventListener("scroll", () => {
    // if (
    //     document.body.scrollTop > 80 ||
    //     document.documentElement.scrollTop > 80
    // ) {
    //     headerRef.current.classList.add("header__shrink");
    // } else {
    //     headerRef.current.classList.remove("header__shrink");
    // }
    // });
    // return () => window.removeEventListener("scroll");
  }, []);
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo" onClick={() => navigate("/home")}>
            <img src={logo} alt="logo" />
            <h5>Tasty Treat</h5>
          </div>
          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div
              className="menu d-flex align-items-center gap-5"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="header__closeButton">
                <span onClick={toggleMenu}>
                  <i className="ri-close-fill"></i>
                </span>
              </div>
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                  onClick={toggleMenu}
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={togleNot}>
              <i className="ri-shopping-basket-line">
                <img src={CardBtn} alt="logo" />
              </i>
              <span className="cart__badge">{cartItems.length}</span>
            </span>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
