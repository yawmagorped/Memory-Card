import '../styles/CardPack.css'
import { useState, useEffect } from 'react';
import Card from './Card';

function CardPack({handleScore}) {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [deckId, setDeckId] = useState(null);

    async function getPackOfCardsID() {
        try {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const data = await response.json();
            return data.deck_id;
        } catch (error) {
            console.error("failed to fetch");
            throw error;
        }
    }

    async function getRandomCards(id, count) {
        try {
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${count}`);
            const data = await response.json();
            return data.cards;
        } catch (error) {
            console.error("failed to fetch");
            throw error;
        }
    }

    useEffect(() => {
        async function handleRandomCards(count) {
            const id = await getPackOfCardsID();
            setDeckId(id);
            let cards = await getRandomCards(id, count);
            setCards(cards);
        }

        handleRandomCards(52);
    }, [])

    async function reshuffleCards() {
        if (!deckId) return;

        try {
            await fetch(
                `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
            );

            const cards = await getRandomCards(deckId, 52);
            setCards(cards);
        } catch (error) {
            console.error("Failed to reshuffle", error);
        }
    }

    function handleClick(code) {
        const card = cards.find(card => card.code === code);
        
        if (!card) return;

        if (!selectedCards.find(card => card.code === code)){
            setSelectedCards(prev => [...prev, card]);
            handleScore();
        } else {
            handleScore("reset");
            setSelectedCards([]);
        }

        reshuffleCards();
    }

    return (
        <div className='cardPack'>
            {cards.slice(0, 10).map(key => <Card key={key.code} name={key.value} source={key.image} handleClick={() => handleClick(key.code)}/>)}
        </div>
    )
}

export default CardPack
