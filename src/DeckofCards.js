import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./DeckofCards.css";

/** DeckofCards.js: uses deck API, allows drawing card at a time. */
// Api card url
const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
    const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(function loadDeckFromAPI() {
    async function fetchData() {
      const d = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck(d.data);
    }
    fetchData();
  }, []);
/** Draw card: change the state & effect will kick in. */
async function draw() {
    try {
      const drawRes = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/`);

      if (drawRes.data.remaining === 0) throw new Error("Deck empty!");

      const card = drawRes.data.cards[0];

      setDrawn(d => [
        ...d,
        {
          id: card.code,
          name: card.suit + " " + card.value,
          image: card.image,
        },
      ]);
    } catch (err) {
      alert(err);
    }
  }

  /** Shuffle: change the state & effect will kick in. */
  async function startShuffling() {
    setIsShuffling(true);
    try {
      await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`);
      setDrawn([]);
    } catch (err) {
      alert(err);
    } finally {
      setIsShuffling(false);
    }
  }

  /** Return draw button (disabled if shuffling) */
  function renderDrawBtnIfOk() {
    if (!deck) return null;

    return (
      <button
        className="Draw-card"
        onClick={draw}
        disabled={isShuffling}>
        DRAW
      </button>
    );
  }

  /** Return shuffle button (disabled if already is) */
  function renderShuffleBtnIfOk() {
    if (!deck) return null;
    return (
      <button
        className="Draw-card"
        onClick={startShuffling}
        disabled={isShuffling}>
        SHUFFLE DECK
      </button>
    );
  }

  return (
    <main className="Deck">

      {renderDrawBtnIfOk()}
      {renderShuffleBtnIfOk()}

      <div className="Deck-cardarea">{
        drawn.map(c => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))}
      </div>

    </main>
  );
}

export default Deck;


