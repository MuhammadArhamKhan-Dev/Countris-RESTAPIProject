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
    fetch("https://api.restcountries.com/countries/v5?limit=100", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.data?.objects || res.objects || [];
        setCountries(data);
        setLoad(false);
      });
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