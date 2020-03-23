import React from "react";
import "./footer.scss";

function Footer() {
  return (
    <>
      <footer>
        <h1>This is a sad attempt to use Footer</h1>
        <button type="button" className="btn-hero-disabled">
          <i className="eva eva-shopping-cart"></i>
          Primary Button
        </button>
        <button type="button" className="btn-hero">
          <i className="eva eva-shopping-cart-outline"></i>
          Primary Button
        </button>
        <button type="button" className="btn-grey">
          Secondary Button
        </button>
        <button type="button" className="btn-grey-disabled">
          Secondary Button
        </button>
        <button type="button" className="btn-hero-round">
          <i className="eva  eva-2x eva-edit-outline"></i>
        </button>
        <button type="button" className="btn-hero-round-disabled">
          <i className="eva  eva-2x eva-edit"></i>
        </button>
        <button type="button" className="btn-grey-round">
          <i className="eva  eva-2x eva-edit"></i>
        </button>
        <button type="button" className="btn-grey-round-disabled">
          <i className="eva  eva-2x eva-edit"></i>
        </button>
        <h1>Links</h1>
        <a href="#" className="textlink-1">
          Link 1
        </a>
        <a href="#" className="textlink-disabled">
          Link disabled
        </a>
        <a href="#" className="textlink-2">
          Link 2
        </a>
        <a href="#" className="textlink-3">
          Link 3
        </a>
      </footer>
    </>
  );
}

export default Footer;
