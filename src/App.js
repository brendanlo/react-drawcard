import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Game from './Game';

const BASE_URL = "http://deckofcardsapi.com/api/deck/";


/** Loads deck data and renders Game component
 * 
 * Props:
 * - none
 * 
 * State:
 * - deck: object containing deck information pulled from deck of cards API 
 *       (http://deckofcardsapi.com/)
 *            {
                  "success": true,
                  "deck_id": "3p40paa87x90",
                  "shuffled": false,
                  "remaining": 52
              }
 * - isLoading: boolean for whether the page is loading or not
 * 
 * App -> Game
 */
function App() {
  const [deck, setDeck] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function fetchDeckOnLoad() {
    async function fetchDeck() {
      const deckResult = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
      console.log("fetchDeck, deckResult: ", deckResult);

      setDeck(deckResult.data);
      setIsLoading(false);
    }
    fetchDeck();
  }, []);

  if (isLoading) return <p> Loading... </p>;

  return (
    < Game deck={deck} />
  );
}

export default App;
