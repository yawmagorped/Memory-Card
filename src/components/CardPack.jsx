import '../styles/CardPack.css'
import { useState, useEffect } from 'react';
import Card from './Card';

function CardPack() {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
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
            setCards(cards);
        }

        handleRandomCards(52);
    }, [])

    function handleClick(code) {
        
        const card = cards.find(card => card.code === code);
        if (!card) return;

        if (!selectedCards.find(card => card.code === code))
            setSelectedCards(prev => [...prev, card]);

        // setCards(prev => prev.filter(card => card.code !== code));
        console.log("cards:");
        cards.forEach(card => console.log(card))
        console.log("selectedCards:");
        selectedCards.forEach(card => console.log(card));
    }

    return (
        <div className='cardPack'>
            {cards.map(key => <Card key={key.code} name={key.value} source={key.image} handleClick={() => handleClick(key.code)}/>)}
        </div>
    )
}

export default CardPack
