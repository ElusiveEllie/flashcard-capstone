import React, { useState, useEffect } from "react";
import { updateDeck, readDeck } from "../utils/api";
import { Link as Linkle, useHistory, useParams } from "react-router-dom";
import DeckDetails from "./DeckDetails";

function EditDeck({}) {
  const history = useHistory();
  const params = useParams();
  const [deck, setDeck] = useState();
  const [formData, setFormData] = useState();
  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(params.deckId);
      setDeck(loadedDeck);
      // Fill in formData with deck's original info to populate default values
      setFormData({
        name: loadedDeck.name,
        description: loadedDeck.description,
        id: loadedDeck.id,
        cards: loadedDeck.cards,
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
    const result = await updateDeck(formData);
    // Update state for display while decks are reloaded from API
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
              Edit Deck
            </li>
          </ol>
        </nav>

        <h1>Edit Deck</h1>
        <form onSubmit={handleSubmit}>
        {DeckDetails(formData, handleChange)}
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

export default EditDeck;
