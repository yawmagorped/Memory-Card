import '../styles/CardPack.css'
import { useState } from 'react';
import Card from './Card';

function CardPack() {
    const [cards, setCards] = useState([]);

    return (
        <div className='cardPack'>
            {cards.map(key => <Card />)}
            <Card></Card>
        </div>
    )
}

export default CardPack
