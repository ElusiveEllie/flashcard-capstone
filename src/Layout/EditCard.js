import React, { useState, useEffect } from "react";
import { updateCard, readDeck, readCard } from "../utils/api";
import { Link as Linkle, useHistory, useParams } from "react-router-dom";

function EditCard() {
  const history = useHistory();
  const params = useParams();
  const [deck, setDeck] = useState();
  const [card, setCard] = useState();
  const [formData, setFormData] = useState();
  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(params.deckId);
      const loadedCard = await readCard(params.cardId);
      setDeck(loadedDeck);
      setCard(loadedCard);
      setFormData({
        front: loadedCard.front,
        back: loadedCard.back,
        id: loadedCard.id,
        deckId: loadedCard.deckId,
      });
    }

    loadDeck();
  }, []);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await updateCard(formData);
    history.push(`/decks/${deck.id}`);
  }

  if (formData) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Linkle to="/">Home</Linkle>
            </li>
            <li className="breadcrumb-item">
              <Linkle to={`/decks/${params.deckId}`}>{deck.name}</Linkle>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card {card.id}
            </li>
          </ol>
        </nav>
        <h1>Edit Card</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="cardFront" className="form-label">
            Front:
          </label>
          <textarea
            type="text"
            id="cardFront"
            name="front"
            className="form-control"
            placeholder="Front side of card"
            value={formData.front}
            onChange={handleChange}
          />
          <label htmlFor="cardBack" className="form-label">
            Back:
          </label>
          <textarea
            type="text"
            id="cardBack"
            name="back"
            className="form-control"
            placeholder="Back side of card"
            value={formData.back}
            onChange={handleChange}
          />
          <Linkle to={`/decks/${deck.id}`}>
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </Linkle>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
  return "Loading...";
}

export default EditCard;
