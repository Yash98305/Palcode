import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import "../css/card.css"; // Add CSS for styling
import useAuth from "../context/auth";

const Card = ({ card, index, moveCard }) => {
  const [, ref] = useDrag({
    type: "CARD",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drop(ref(node))} className="card">
      <h3>{card.title}</h3>
      <p>{card.description}</p>
    </div>
  );
};

const CardReorder = () => {
  const [cards, setCards] = useState([]);
  const { api } = useAuth();

  // Fetch card data from API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${api}/auth/cards`);
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, [api]);

  // Function to handle card reordering
  const moveCard = (fromIndex, toIndex) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    setCards(updatedCards);
  };

  // Save the reordered layout
  const saveLayout = async () => {
    try {
      await axios.post(`${api}/auth/save-layout`, { layout: cards });
      console.log("Layout saved successfully");
    } catch (error) {
      console.error("Error saving layout:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="card-container">
        <div className="card-list">
          {cards.map((card, index) => (
            <Card key={card.id} card={card} index={index} moveCard={moveCard} />
          ))}
        </div>
        <button onClick={saveLayout} className="save-button">
          Save Layout
        </button>
      </div>
    </DndProvider>
  );
};

export default CardReorder;
