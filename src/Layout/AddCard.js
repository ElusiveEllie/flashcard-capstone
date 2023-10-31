import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../utils/api";
import { Link as Linkle, useParams } from "react-router-dom";
import CardDetails from "./CardDetails";

function AddCard() {
  const params = useParams();
  const [deck, setDeck] = useState();
  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(params.deckId);
      setDeck(loadedDeck);
    }

    loadDeck();
  }, []);

  // Use initial state to have form be blank after each card is added
  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    // Update formData as new information is typed in
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await createCard(deck.id, formData);
    setFormData({ ...initialFormState });
  }

  // Wait for formData to be filled in during useEffect before displaying page
  if (deck) {
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
              Add Card
            </li>
          </ol>
        </nav>

        <h1>Add Card</h1>
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

export default AddCard;
