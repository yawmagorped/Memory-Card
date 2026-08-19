import '../styles/CardPack.css'
import { useState, useEffect } from 'react';
import Card from './Card';

function CardPack() {
    const [cards, setCards] = useState([]);
    // const [id, setId] = useState(null);

    function getPackOfCardsID() {
        return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')       
            .then(response => response.json())
            .then(data => {
                return data.deck_id;
            })
            .catch(error => {
                console.error("failed to fetch");
                throw error;
            })
    }

    function getRandomCards(id, count) {
        return fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${count}`)       
            .then(response => response.json())
            .then(data => {
                return data.cards;
            })
            .catch(error => {
                console.error("failed to fetch");
                throw error;
            })
    }

    
    useEffect(() => {
        async function handleRandomCards(count) {
            let id = null;
            if (id === null) {
                id = await getPackOfCardsID();
            }
            let cards = await getRandomCards(id, count);
            console.log(cards);
            setCards(cards);
        }

        handleRandomCards(10);
    }, [])


    return (
        <div className='cardPack'>
            {cards.map(key => <Card name={key.value} source={key.image}/>)}
        </div>
    )
}

export default CardPack
