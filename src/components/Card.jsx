import '../styles/Card.css'

function Card({name = "default", source}) {
    return ( 
        <a href='#' className='card'>
            <img src={source} alt={name} />
        </a>
     );
}

export default Card;