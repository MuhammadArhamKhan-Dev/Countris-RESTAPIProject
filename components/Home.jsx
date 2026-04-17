import { useState } from "react"
import CountryList from "./CountryList"
import SearchFilter from "./SearchFilter"
import { useTheme } from "../hooks/useTheme"


const Home = () => {

  const [query, setQuery] = useState('')
  const [isDark, setIsDark] = useTheme()
  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase())
  }
  return (
    <main className={`${isDark ? 'dark' : ''}`}>

      <section>
        <SearchFilter searchHandler={handleSearch} />
        <CountryList query={query} />
      </section>
    </main>
  )
}

export default Home
