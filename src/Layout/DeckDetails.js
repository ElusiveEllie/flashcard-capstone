import React from "react";

function DeckDetails(formData, handleChange) {
  return (
    <>
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
    </>
  );
}

export default DeckDetails;