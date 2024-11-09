import React, { useState } from "react";
import "./Card.css";


// Each card, renders the card once drawn from the deck
function Card({ name, image }) {
    // get these once; it will never be updated for the same card
    const [{ angle, xPos, yPos }] = useState({
      angle: Math.random() * 90 - 45,
      xPos: Math.random() * 40 - 20,
      yPos: Math.random() * 40 - 20,
    });
  
    const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  
    // Return card html
    return <img
        className="Card"
        alt={name}
        src={image}
        style={{ transform }} />;
  }
  
  export default Card;