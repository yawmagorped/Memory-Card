import '../styles/Card.css'

function Card({name = "default", source, handleClick}) {
    return ( 
        <a href='#' className='card' onClick={handleClick}>
            <img src={source} alt={name} />
        </a>
     );
}

export default Card;