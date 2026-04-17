import { useEffect, useState } from "react"
import "../style.css"
import styles from "./CountryList.module.css"
import CountryCard from "./CountryCard"
import Shimmer1 from "./Shimmer1"


const CountryList = ({query = ''}) => {

    const [countries, setCountries] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,borders")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data)
                setLoad(false)
            })

    }, [])



    return  (
        <div className={styles.second}>
            {
                load? Array.from({length: 8}).map((_, i) => <Shimmer1 key={i} />)
               : 
            
            countries.filter((country)=>country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query) )
                .map((country, i) => (

                    <CountryCard key={i} name={country.name.common}
                        flag={country.flags.svg}
                        population={country.population.toLocaleString("en-UN")}
                        region={country.region}
                        capital={country.capital?.[0]} />
                ))
            }
        

        </div>
    )
}

export default CountryList
