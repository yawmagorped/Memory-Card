import '../styles/Card.css'
import test from "../assets/hero.png"
function Card() {
    return ( 
        <a href='#' className='card'>
            <img src={test} alt="" />
            <p>lorem ipsum</p>
        </a>
     );
}

export default Card;