import React, { useState } from "react";
import { updateDeck } from "../utils/api";
import { Link as Linkle, useHistory, useParams } from "react-router-dom";

function EditDeck({ decks, setDecks }) {
  const history = useHistory();
  const params = useParams();
  const deck = decks.filter((deck) => deck.id == params.deckId)[0];
  const initialFormState = {
    name: deck.name,
    description: deck.description,
    id: deck.id,
    cards: deck.cards
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await updateDeck(formData);
    setDecks([...decks, result]);
    history.push(`/decks/${deck.id}`);
  }

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
        <label htmlFor="deckName" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="deckName"
          name="name"
          className="form-control"
          placeholder="Deck Name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="deckDescription" className="form-label">
          Description:
        </label>
        <textarea
          type="text"
          id="deckDescription"
          name="description"
          className="form-control"
          placeholder="Brief description of the deck"
          value={formData.description}
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

export default EditDeck;
