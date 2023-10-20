import React, {useState, useEffect} from "react";
import { Link as Linkle } from "react-router-dom";
import { listDecks } from "../utils/api";

function HomeScreen({ decks, setDecks, deleteDeckWithId }) {
  useEffect(() => {
    async function loadDecks() {
      const loadedDecks = await listDecks();
      setDecks(loadedDecks);
    }

    loadDecks();
  }, []);
  if (decks) {
    // Map decks out to array of different cards displaying each deck's information
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
            // Use passed-in deck deletion function to update state
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
  return "Loading...";
}

export default HomeScreen;
