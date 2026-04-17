import { useEffect, useState } from "react"
import "../style.css"
import styles from "./CountryDetail.module.css"
import { useParams } from "react-router"
import { useTheme } from "../hooks/useTheme"
import Shimmer2 from "./Shimmer2"
import { Link } from "react-router-dom"


const CountryDetail = () => {

    //const countryName = new URLSearchParams(location.search).get("name")
    const params = useParams()
    const countryName = params.country
    const [countries, setCountries] = useState()
    const [countryBorders, setBorders] = useState([])
    const [load, setLoad] = useState(true)
    const [error, setError] = useState(false)
    const [isDark, setIsDark] = useTheme()

    useEffect(() => {

        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,flags,region,population,capital,subregion,tld,currencies,languages,borders`)
            .then((res) => res.json())
            .then((data) => {
                if (!data || !data.length) {
                    throw new Response("Country Not Found", { status: 404 });
                }
                const country = data[0];
                setCountries(
                    {
                        name: country.name.common,
                        nativeName: Object.values(country.name.nativeName || {})[0]?.common,
                        population: country.population,
                        region: country.region,
                        subRegion: country.subregion,
                        capital: country.capital?.join(", ") || "N/A",
                        topLevelDomain: country.tld,
                        currencies: Object.values(country.currencies || {}).map((currency) => currency.name).join(', '),
                        languages: Object.values(country.languages || {}).join(', '),
                        flags: Object.values(country.flags)[1],
                        borders: country.borders || [],
                    }


                )
                setLoad(false)
            })
            .catch(err => {
                console.log(err)
                setError(true)
            })
            .finally(() => {
                setLoad(false)
            })
    }, [countryName])

    useEffect(() => {
        if (!countries?.borders?.length) return

        fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countries.borders.join(",")}`
        )
            .then(res => res.json())
            .then(data => {
                setBorders(data)
            })

    }, [countries])

    if (error) {
        return <>
            <div style={{padding: "10px"}} className={styles.back}>
                <button style={{padding: "6px 20px"}} className="montserrat-body" onClick={() => history.back()}>← Back</button>
            </div>
            <h1 style={{ textAlign: "center", }} className="montserrat-body">Country Not Found</h1>
        </>
    }
    return (
        <main className={[`${isDark ? 'dark' : ''}`, styles.main2].join(' ')}>

            <section className={styles.section3}>
                <div className={styles.back}>
                    <button className="montserrat-body" onClick={() => history.back()}>← Back</button>
                </div>
                {load ? <Shimmer2 />
                    :
                    <div className={styles.information}>
                        <div className={styles.left}>
                            <h1 className="montserrat-body">{countries.name}</h1>
                            <img src={countries.flags} alt={countries.name} />
                        </div>

                        <div className={[styles.right, "montserrat-body"].join(' ')}>
                            <p><b>Native Name: </b>{countries.nativeName || countries.name}</p>
                            <p><b>Population: </b>{countries.population.toLocaleString('en-UN')}</p>
                            <p><b>Region: </b>{countries.region}</p>
                            <p><b>Sub Region: </b>{countries.subRegion}</p>
                            <p><b>Capital: </b>{countries.capital}</p>
                            <p><b>Top Level Domain: </b>{countries.topLevelDomain}</p>
                            <p><b>Currencies: </b>{countries.currencies}</p>
                            <p><b>Languages: </b>{countries.languages}</p>
                            <p><b>Borders: </b>{countryBorders.length ? countryBorders.map((c, i) => (<Link key={i} to={`/${c.name.common.toLowerCase()}`}>{c.name.common} </Link>)) : "None"}</p>
                        </div>
                    </div>
                }
            </section>

        </main>
    )
}

export default CountryDetail
