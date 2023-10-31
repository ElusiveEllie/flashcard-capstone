import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { Link as Linkle, useHistory } from "react-router-dom";
import DeckDetails from "./DeckDetails";

function NewDeck({ decks, setDecks }) {
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  // Update state when form is edited for later submission
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await createDeck(formData);
    // Set cards to an empty array so the state can be displayed while the API loads the deck view
    result.cards = [];
    setDecks([...decks, result]);
    history.push(`/decks/${result.id}`);
  }

  return (
    // Breadcrumb
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Linkle to="/">Home</Linkle>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        {DeckDetails(formData, handleChange)}
        {/* Redirect to home page when canceling */}
        <Linkle to="/">
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

export default NewDeck;
