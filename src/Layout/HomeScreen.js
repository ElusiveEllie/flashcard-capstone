import React from "react";
import { Link as Linkle } from "react-router-dom";

function HomeScreen({ decks, deleteDeckWithId }) {
  const deckLayout = decks.map((deck) => (
    <div className="card" key={deck.id}>
      <div className="card-body">
        <h2 className="card-title">{deck.name}</h2>
        <p className="card-text">{deck.cards.length} cards</p>
        <p className="card-text">{deck.description}</p>
        <Linkle to={`/decks/${deck.id}`}>
          <button type="button" className="btn btn-secondary">
            View
          </button>
        </Linkle>
        <Linkle to={`/decks/${deck.id}/study`}>
          <button type="button" className="btn btn-primary">
            Study
          </button>
        </Linkle>
        <button
          type="button"
          className="btn btn-danger"
          onClick={(event) => deleteDeckWithId(deck.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
  return (
    <>
      <Linkle to="/decks/new">
        <button type="button" className="btn btn-secondary">
          Create Deck
        </button>
      </Linkle>
      {deckLayout}
    </>
  );
}

export default HomeScreen;
