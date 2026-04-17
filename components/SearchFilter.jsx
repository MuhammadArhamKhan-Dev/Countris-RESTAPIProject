import styles from "./SearchFilter.module.css"
import "../style.css"


const SearchFilter = ({searchHandler}) => {

    
    return (
        <>
            <div className={styles.first}>

                <div className={styles.search}>
                    <input className="montserrat-body" type="text" placeholder="🔍︎ Search for a country" onChange={searchHandler} />
                </div>
                <div className={styles.filter}>
                    <select className="montserrat-body" onChange={searchHandler}>
                        <option hidden>Filter by region</option>
                        <option value="Africa">Africa</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Americas">Americas</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default SearchFilter
