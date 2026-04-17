import { FaMoon, FaSun } from "react-icons/fa"
import "../style.css"
import styles from "./Header.module.css"
import { useTheme } from "../hooks/useTheme"

const Header = () => {

  const [isDark, setIsDark] = useTheme()
  return (
    <>
      <nav className={[styles.navigation, `${isDark ? 'dark' : ''}`].join(' ')}>
        <header>
          <div className={styles.left}>
            <h3 className="montserrat-heading">Countris</h3>
          </div>
          <div className={styles.right}>
            {
              isDark ? (<FaSun style={{ color: "orange" }} />)
                : (<FaMoon style={{ color: "black" }} />)
            }
            <h4 className='montserrat-body' onClick={() => { setIsDark(!isDark), localStorage.setItem("darkMode", !isDark) }}>{
              isDark ? "Light Mode" : "Dark Mode"}</h4>
          </div>
        </header>
      </nav>
    </>
  )
}
export default Header
