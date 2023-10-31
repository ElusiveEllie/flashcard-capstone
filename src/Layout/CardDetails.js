import React from "react";

function CardDetails(formData, handleChange) {
  return (
    <>
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
    </>
  );
}

export default CardDetails;
