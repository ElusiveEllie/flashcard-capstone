import React, { useState, useEffect } from "react";
import { useParams, Link as Linkle, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function DeckStudy() {
  const history = useHistory();
  const params = useParams();
  const [deck, setDeck] = useState();
  const [cardView, setCardView] = useState({ card: 0, isFront: true });
  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(params.deckId);
      setDeck(loadedDeck);
    }

    loadDeck();
  }, []);
  if (deck) {
    const nextCard = (cardView) => {
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
              setCardView({ ...cardView, isFront: !cardView.isFront })
            }
          >
            Flip
          </button>
          {nextCard(cardView)}
        </div>
      );
    };

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
