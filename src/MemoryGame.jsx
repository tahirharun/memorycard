import { useState } from "react";

const cardValues = ["Cat", "Dog", "Fox", "Lion", "Bear", "Tiger", "Wolf", "Owl"];

function shuffleArray(arr) {
  return [...arr, ...arr]
    .sort(() => Math.random() - 0.5)
    .map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
}

export default function MemoryGame() {
  const [cards, setCards] = useState(shuffleArray(cardValues));
  const [flippedCards, setFlippedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  const handleClick = (card) => {
    if (disabled || card.isFlipped || card.isMatched) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    const newFlipped = [...flippedCards, { ...card, isFlipped: true }];

    setCards(updatedCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves((prev) => prev + 1);
      setTimeout(() => checkMatch(newFlipped, updatedCards), 900);
    }
  };

  const checkMatch = (flipped, updatedCards) => {
    const [first, second] = flipped;

    if (first.value === second.value) {
      setCards(
        updatedCards.map((c) =>
          c.value === first.value ? { ...c, isMatched: true } : c
        )
      );
    } else {
      setCards(
        updatedCards.map((c) =>
          c.isMatched ? c : { ...c, isFlipped: false }
        )
      );
    }

    setFlippedCards([]);
    setDisabled(false);
  };

  const restartGame = () => {
    setCards(shuffleArray(cardValues));
    setFlippedCards([]);
    setMoves(0);
    setDisabled(false);
  };

  const allMatched = cards.every((card) => card.isMatched);

  return (
    /* OUTER WRAPPER (centers everything) */
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#1f2937",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      {/* GAME CONTAINER */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          Memory Game
        </h1>

        <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
          Moves: {moves}
        </p>

        {allMatched && (
          <p
            style={{
              color: "#22c55e",
              fontWeight: "bold",
              fontSize: "1.4rem",
              marginBottom: "10px",
            }}
          >
            You Won!
          </p>
        )}

        {/* CARD GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(100px, 1fr))",
            gap: "15px",
            margin: "25px auto",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleClick(card)}
              style={{
                height: "90px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  card.isFlipped || card.isMatched ? "#f9fafb" : "#374151",
                color:
                  card.isFlipped || card.isMatched ? "#111827" : "#f9fafb",
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 6px 12px rgba(0,0,0,0.35)",
                userSelect: "none",
                transition: "transform 0.2s, background 0.2s",
                transform:
                  card.isFlipped || card.isMatched ? "scale(1.03)" : "scale(1)",
              }}
            >
              {card.isFlipped || card.isMatched ? card.value : ""}
            </div>
          ))}
        </div>

        {/* RESTART BUTTON */}
        <button
          onClick={restartGame}
          style={{
            marginTop: "15px",
            padding: "10px 26px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
