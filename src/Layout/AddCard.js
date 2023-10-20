import React, { useState } from "react";
import { createCard } from "../utils/api";
import { Link as Linkle, useParams } from "react-router-dom";

function AddCard({ decks }) {
  const params = useParams();
  const deck = decks.filter((deck) => deck.id == params.deckId)[0];
  const initialFormState = {
    front: "",
    back: "",
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
    await createCard(deck.id, formData);
    setFormData({ ...initialFormState });
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
            Add Card
          </li>
        </ol>
      </nav>
      <h1>Add Card</h1>
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

export default AddCard;
