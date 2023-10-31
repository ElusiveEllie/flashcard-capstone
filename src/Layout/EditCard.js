import React, { useState, useEffect } from "react";
import { updateCard, readDeck, readCard } from "../utils/api";
import { Link as Linkle, useHistory, useParams } from "react-router-dom";
import CardDetails from "./CardDetails";

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
      // Fill in formData with card's original info to populate default values
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
    // Update formData as new information is typed in
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

  // Wait for formData to be filled in during useEffect before displaying page
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
        {CardDetails(formData, handleChange)}
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
