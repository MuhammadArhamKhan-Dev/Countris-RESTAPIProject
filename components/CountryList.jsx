import { useEffect, useState } from "react";
import "../style.css";
import styles from "./CountryList.module.css";
import CountryCard from "./CountryCard";
import Shimmer1 from "./Shimmer1";

const API_KEY = process.env.RESTCOUNTRIES_API_KEY;

const CountryList = ({ query = "" }) => {
  const [countries, setCountries] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://api.restcountries.com/countries/v5?limit=25&pretty=1",
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const res = await response.json();

      console.log("FULL API RESPONSE:", res);

      const countries =
        res?.data?.objects ??
        res?.objects ??
        [];

      console.log("PARSED COUNTRIES:", countries);

      setCountries(countries);
      setLoad(false);
    } catch (err) {
      console.error("API ERROR:", err);
      setLoad(false);
    }
  };

  fetchCountries();
}, []);

  const q = query.toLowerCase();

  return (
    <div className={styles.second}>
      {load
        ? Array.from({ length: 8 }).map((_, i) => (
            <Shimmer1 key={i} />
          ))
        : countries
            .filter(
              (country) =>
                country.names?.common?.toLowerCase().includes(q) ||
                country.region?.toLowerCase()?.includes(q)
            )
            .map((country, i) => (
              <CountryCard
                key={i}
                name={country.names?.common}
                flag={country.flag?.url_svg}
                population={country.population?.toLocaleString("en-US")}
                region={country.region}
                capital={country.capitals?.[0]?.name}
              />
            ))}
    </div>
  );
};

export default CountryList;