import { useEffect, useState } from "react"
import "../style.css"
import styles from "./CountryList.module.css"
import CountryCard from "./CountryCard"
import Shimmer1 from "./Shimmer1"

const API_KEY = process.env.RESTCOUNTRIES_API_KEY;
const CountryList = ({query = ''}) => {

    const [countries, setCountries] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        fetch("https://api.restcountries.com/countries/v5?response_fields=names,flag,region,population,capitals,borders",
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        )
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
            
            countries.filter((country)=>country.names.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query) )
                .map((country, i) => (

                    <CountryCard key={i} name={country.names.common}
                        flag={country.flags.svg}
                        population={country.population.toLocaleString("en-UN")}
                        region={country.region}
                        capital={country.capitals?.[0]} />
                ))
            }
        

        </div>
    )
}

export default CountryList
