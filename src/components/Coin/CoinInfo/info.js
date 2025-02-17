import React, { useState } from "react";
import "./styles.css";

function CoinInfo({ name, desc }) {
  const [flag, setFlag] = useState(false);

  // Ensure desc is defined and is a string
  const description = desc || "";

  const smallDesc =
    description.length > 400
      ? description.slice(0, 400) +
        "<p style='color:var(--grey); cursor:pointer;'>Read More...</p>"
      : description;
  const fullDesc =
    description.length > 400
      ? description + "<p style='color:var(--grey);cursor:pointer;'>Read Less...</p>"
      : description;

  return (
    <div className="grey-wrapper">
      <h1 className="coin-desc-heading">{name}</h1>
      <p
        onClick={() => {
          description.length > 400 && setFlag(!flag);
        }}
        className="coin-desc-para"
        dangerouslySetInnerHTML={{ __html: flag ? fullDesc : smallDesc }}
      />
    </div>
  );
}

export default CoinInfo;
