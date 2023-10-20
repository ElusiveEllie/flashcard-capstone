import React, { useState, useEffect } from "react";
import { useParams, Link as Linkle, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function DeckStudy() {
  const history = useHistory();
  const params = useParams();
  const [deck, setDeck] = useState();
  // Set initial state of cardView to be on the first card's front
  const [cardView, setCardView] = useState({ card: 0, isFront: true });
  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(params.deckId);
      setDeck(loadedDeck);
    }

    loadDeck();
  }, []);

  // Wait for deck to load in before displaying page
  if (deck) {
    // Function to move to next card
    const nextCard = (cardView) => {
      // Check that final card's back is being shown
      if (cardView.card === deck.cards.length - 1 && !cardView.isFront) {
        return (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (
                window.confirm(
                  `Restart cards?\n\nClick "Cancel" to return to the home page.`
                )
              ) {
                // Reset state to first card's front
                setCardView({ card: 0, isFront: true });
              } else {
                history.push("/");
              }
            }}
          >
            Next
          </button>
        );
      } else if (!cardView.isFront) {
        // If not on final card's back, move to next card's front
        return (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              setCardView({ card: cardView.card + 1, isFront: true })
            }
          >
            Next
          </button>
        );
      }
    };

    // Function to display card
    const showCard = (cardView) => {
      return (
        <div className="card">
          <h4 className="card-title">
            Card {cardView.card + 1} of {deck.cards.length}
          </h4>
          {cardView.isFront ? (
            <p className="card-text">{deck.cards[cardView.card].front}</p>
          ) : (
            <p className="card-text">{deck.cards[cardView.card].back}</p>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              // Flip between front and back
              setCardView({ ...cardView, isFront: !cardView.isFront })
            }
          >
            Flip
          </button>
          {nextCard(cardView)}
        </div>
      );
    };

    // Deck length of less than 3 cannot be studied, gives option to add more cards to deck
    if (deck.cards.length < 3) {
      return (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Linkle to="/">Home</Linkle>
              </li>
              <li className="breadcrumb-item">
                <Linkle to={`/decks/${deck.id}`}>{deck.name}</Linkle>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Study
              </li>
            </ol>
          </nav>

          <h1>{deck.name}: Study</h1>
          <h2>Not enough cards.</h2>
          <p>
            You need at least 3 cards to study. There are {deck.cards.length}{" "}
            cards in this deck.
          </p>
          <Linkle to={`/decks/${params.deckId}/cards/new`}>
            <button type="button" className="btn btn-primary">
              Add Card
            </button>
          </Linkle>
        </>
      );
    }

    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Linkle to="/">Home</Linkle>
            </li>
            <li className="breadcrumb-item">
              <Linkle to={`/decks/${deck.id}`}>{deck.name}</Linkle>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>

        <h1>Study: {deck.name}</h1>
        {showCard(cardView)}
      </>
    );
  }
  return "Loading...";
}

export default DeckStudy;
