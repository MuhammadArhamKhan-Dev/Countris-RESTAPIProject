import { useEffect, useState } from "react"
import "../style.css"
import styles from "./CountryDetail.module.css"
import { useParams } from "react-router"
import { useTheme } from "../hooks/useTheme"
import Shimmer2 from "./Shimmer2"
import { Link } from "react-router-dom"

const API_KEY = process.env.RESTCOUNTRIES_API_KEY;

const CountryDetail = () => {

    const { country } = useParams()

    const [countries, setCountries] = useState()
    const [countryBorders, setBorders] = useState([])
    const [load, setLoad] = useState(true)
    const [error, setError] = useState(false)
    const [isDark] = useTheme()

    // ✅ v5 correct: filter-based query
    useEffect(() => {

        setLoad(true)
        setError(false)

        fetch(
            `https://api.restcountries.com/countries/v5?filter=names.common:eq:${country}`,
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            }
        )
            .then(res => res.json())
            .then((res) => {

                const countryData =
                    res?.data?.objects?.[0] ||
                    res?.objects?.[0]

                if (!countryData) {
                    setError(true)
                    return
                }

                setCountries({
                    name: countryData.names?.common,

                    nativeName:
                        countryData.names?.native
                            ? Object.values(countryData.names.native)[0]?.common
                            : null,

                    population: countryData.population,
                    region: countryData.region,

                    // optional field (safe)
                    subRegion: countryData.subregion || "N/A",

                    capital:
                        countryData.capitals?.map(c => c.name).join(", ") || "N/A",

                    topLevelDomain: countryData.tlds || [],

                    currencies: countryData.currencies
                        ? Object.values(countryData.currencies).map(c => c.name).join(", ")
                        : "N/A",

                    languages: countryData.languages
                        ? countryData.languages.map(l => l.name).join(", ")
                        : "N/A",

                    flags:
                        countryData.flag?.url_svg ||
                        countryData.flag?.url_png,

                    borders: countryData.borders || []
                })

            })
            .catch((err) => {
                console.log(err)
                setError(true)
            })
            .finally(() => setLoad(false))

    }, [country])

    // ✅ borders (v5 correct)
    useEffect(() => {

        if (!countries?.borders?.length) return

        fetch(
            `https://api.restcountries.com/countries/v5?filter=codes.alpha_3:in:${countries.borders.join(",")}`,
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            }
        )
            .then(res => res.json())
            .then(res => {
                const list = res?.data?.objects || res?.objects || []
                setBorders(list)
            })

    }, [countries])

    if (error) {
        return (
            <>
                <div style={{ padding: "10px" }} className={styles.back}>
                    <button
                        style={{ padding: "6px 20px" }}
                        className="montserrat-body"
                        onClick={() => history.back()}
                    >
                        ← Back
                    </button>
                </div>
                <h1 style={{ textAlign: "center" }} className="montserrat-body">
                    Country Not Found
                </h1>
            </>
        )
    }

    return (
        <main className={[`${isDark ? 'dark' : ''}`, styles.main2].join(' ')}>

            <section className={styles.section3}>

                <div className={styles.back}>
                    <button
                        className="montserrat-body"
                        onClick={() => history.back()}
                    >
                        ← Back
                    </button>
                </div>

                {load ? <Shimmer2 /> :

                    <div className={styles.information}>

                        <div className={styles.left}>
                            <h1 className="montserrat-body">{countries?.name}</h1>
                            <img src={countries?.flags} alt={countries?.name} />
                        </div>

                        <div className={[styles.right, "montserrat-body"].join(' ')}>

                            <p><b>Native Name: </b>{countries?.nativeName || "N/A"}</p>

                            <p><b>Population: </b>
                                {countries?.population?.toLocaleString('en-US')}
                            </p>

                            <p><b>Region: </b>{countries?.region}</p>

                            {/* ✅ safe optional field */}
                            <p><b>Sub Region: </b>{countries?.subRegion}</p>

                            <p><b>Capital: </b>{countries?.capital}</p>

                            <p><b>Top Level Domain: </b>{countries?.topLevelDomain?.join(", ")}</p>

                            <p><b>Currencies: </b>{countries?.currencies}</p>

                            <p><b>Languages: </b>{countries?.languages}</p>

                            <p>
                                <b>Borders: </b>
                                {countryBorders.length
                                    ? countryBorders.map((c, i) => (
                                        <Link
                                            key={i}
                                            to={`/${(c.names?.common)?.toLowerCase()}`}
                                        >
                                            {c.names?.common}{" "}
                                        </Link>
                                    ))
                                    : "None"}
                            </p>

                        </div>

                    </div>
                }

            </section>

        </main>
    )
}

export default CountryDetail