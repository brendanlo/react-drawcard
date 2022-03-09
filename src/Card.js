
/** Displays the card
 * 
 * Props:
 * - card object
 *      {
            "image": "http://deckofcardsapi.com/static/img/KH.png",
            "value": "KING",
            "suit": "HEARTS",
            "code": "KH"
        }
 * 
 * State:
 * - none
 * 
 * Game -> Card
 */
function Card({ card }) {
  return (
    <div className='Card'>
      <img src={card.image} alt={card.code} />
    </div>
  );
}

export default Card;