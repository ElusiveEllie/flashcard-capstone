import React, { useState } from "react";
import {
  useParams,
  Link as Linkle,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { deleteCard } from "../utils/api";

function DeckView({ decks, deleteDeckWithId }) {
  const { url } = useRouteMatch();
  const params = useParams();
  const deck = decks.filter((deck) => deck.id == params.deckId)[0];
  const [cards, setCards] = useState(deck.cards);
  const history = useHistory();
  const tempCards = deck.cards.map((card) => (
    <div key={card.id} className="card">
      <p className="card-text">{card.front}</p>
      <p className="card-text">{card.back}</p>
      <Linkle to={`${url}/cards/${card.id}/edit`}>
        <button type="button" className="btn btn-secondary">
          Edit
        </button>
      </Linkle>
      <button
        type="button"
        className="btn btn-danger"
        onClick={(event) => deleteCardWithId(card.id)}
      >
        Delete
      </button>
    </div>
  ));

  const deleteCardWithId = (cardId) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      deleteCard(cardId);
      setCards((currentCards) =>
        currentCards.filter(
          (ignored, index) => currentCards[index].id !== cardId
        )
      );
    }
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Linkle to="/">Home</Linkle>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <Linkle to={`${url}/edit`}>
        <button type="button" className="btn btn-secondary">
          Edit
        </button>
      </Linkle>
      <Linkle to={`${url}/study`}>
        <button type="button" className="btn btn-primary">
          Study
        </button>
      </Linkle>
      <Linkle to={`${url}/cards/new`}>
        <button type="button" className="btn btn-primary">
          Add Card
        </button>
      </Linkle>
      <button
        type="button"
        className="btn btn-danger"
        onClick={(event) => {
          deleteDeckWithId(deck.id);
          history.push("/");
        }}
      >
        Delete
      </button>

      <h2>Cards</h2>
      {tempCards}
    </>
  );
}

export default DeckView;
