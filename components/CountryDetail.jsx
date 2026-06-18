import { useContext, useEffect, useState } from "react"
import "../style.css"
import styles from "./CountryDetail.module.css"
import { Link , useParams } from "react-router"
import ShimmerCardDetail from "./ShimmerCardDetail"
import { ThemeContext } from "../contexts/ThemeContext"

const API_KEY = process.env.RESTCOUNTRIES_API_KEY;
const CountryDetail = () => {

    const params = useParams()
    const cN = params.country
    const countryName = cN.charAt(0).toUpperCase() + cN.slice(1);
    const [countryData, setCountryData] = useState(null)
    const [countryNotFound, setCountryNotFound] = useState(false)
    const [isDark] = useContext(ThemeContext)
    const [load, setLoad] = useState(true)

    useEffect(() => {
        fetch(`https://restcountries.com/v5/name/${cN}?fields=name,flags,region,population,capital,subregion,tld,currencies,languages,borders`,
        {
            headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
        })
            .then((res) => res.json())
            .then(([data]) => {
                setCountryData({
                    name: data.name.common,
                    nativeName: Object.values(data.name.nativeName || {})[0].common,
                    population: data.population,
                    region: data.region,
                    subRegion: data.subregion,
                    capital: Object.values(data.capital).join(', '),
                    topLevelDomain: data.tld,
                    currencies: Object.values(data.currencies || {}).map((currency) => currency.name).join(', '),
                    languages: Object.values(data.languages || {}).join(', '),
                    flags: Object.values(data.flags)[1],
                    borders: [],
                })
                setLoad(false)

                Promise.all(
                    data.borders.map((border) =>
                        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                            .then((res) => res.json())
                            .then(([borderData]) => borderData.name.common)
                    )
                ).then((borders) => {
                    setCountryData((prevState) => ({
                        ...prevState,
                        borders
                    }))
                })
            })
            .catch(()=>{
                setCountryNotFound(true)
            })
    }, [countryName])


    if(countryNotFound){
        return <div className={['montserrat-body', styles.notFound].join(' ')}>Country Not Found!</div>
    }

    return (
        <main className={`${isDark ? 'dark' : ''}`}>
            {load ? <ShimmerCardDetail /> : 
        <section className={styles.section3}>
            <div className={styles.first}>
                <button className="montserrat-body" onClick={() => history.back()}>Back</button>
            </div>
            <div className={styles.second}>
                <div className={styles.main}>
                    <h1 className="montserrat-body">{countryData.name}</h1>
                    <img src={countryData.flags} alt={countryData.name} />
                </div>
                <div className={['montserrat-body', styles.details].join(' ')}>
                    <p><b>Native Name: </b>{countryData.nativeName || countryData.name}</p>
                    <p><b>Population: </b>{countryData.population.toLocaleString('en-UN')}</p>
                    <p><b>Region: </b>{countryData.region}</p>
                    <p><b>Sub Region: </b>{countryData.subRegion}</p>
                    <p><b>Capital: </b>{countryData.capital}</p>
                    <p><b>Top Level Domain: </b>{countryData.topLevelDomain}</p>
                    <p><b>Currencies: </b>{countryData.currencies}</p>
                    <p><b>Languages: </b>{countryData.languages}</p>
                    <p className={styles.borders}>
                        <b>Borders: </b>
                        {countryData.borders.length === 0
                            ? 'None'
                            : countryData.borders.map((border) => (
                                <Link key={border} to={`/${border}`.toLowerCase()}>{border} </Link>
                            ))
                        }
                    </p>
                </div>
            </div>
        </section>
}
        </main>
    )

}

export default CountryDetail
