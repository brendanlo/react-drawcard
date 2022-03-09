import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const BASE_URL = "http://deckofcardsapi.com/api/deck/";


/** Game renders the cards and get card button
 * 
 * Props: 
 * - deck: object containing deck information pulled from deck of cards API 
 *       (http://deckofcardsapi.com/)
 *            {
                  "success": true,
                  "deck_id": "3p40paa87x90",
                  "shuffled": false,
                  "remaining": 52
              }
 * 
 * State:
 * - cards: array of card objects [{
            "image": "http://deckofcardsapi.com/static/img/KH.png",
            "value": "KING",
            "suit": "HEARTS",
            "code": "KH"
        }, ...]
 * - requestCard: boolean representing whether the player has requested a card
 * 
 * App -> Game -> Card
 */
function Game({ deck }) {
  const [cards, setCards] = useState([]);
  const [requestCard, setRequestCard] = useState(false);
  console.log("<Game>", deck, cards.length);

  useEffect(function fetchCardOnClick() {
    // provide a card when requested. If the entire 52 card deck is drawn, show
    // error text
    async function fetchCard() {
      if (requestCard) {
        if (cards.length >= 52) {
          alert("Error: no cards remaining!");
        }
        else {
          const cardResult =
            await axios.get(`${BASE_URL}/${deck.deck_id}/draw/?count=1`);

          console.log("fetchCard(), cardResult: ", cardResult);
          setCards(oldCards => [cardResult.data.cards[0], ...oldCards]);
          setRequestCard(false);
        }
      }
    }
    fetchCard();
  }, [requestCard]);

  function handleClick() {
    console.log("handleClick()");
    setRequestCard(true);
  }

  return (
    <div className='Game'>
      < button onClick={handleClick}> Give me a card! </button>
      {cards.map(card => <Card key={card.code} card={card} />)}
    </div >
  );
}

export default Game;