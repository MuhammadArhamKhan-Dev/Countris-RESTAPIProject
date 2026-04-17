import "../style.css"
import styles from "./CountryCard.module.css"
import { Link } from "react-router-dom"

const CountryCard = ({name, flag, population, region, capital}) => {
    return (
        <Link className={styles.card} to={`/${name.toLowerCase()}`}>
            <div className={styles.imageContainer}>
            <img src={flag} alt={name + "flag"} />
            </div>

            <div className={[styles.details, "montserrat-body"]. join(' ')}>
            <p><b>Name: </b>{name}</p>
            <p><b>Population: </b>{population}</p>
            <p><b>Capital: </b>{capital}</p>
            </div>
        </Link>
    )
}

export default CountryCard
