import { useRouteError } from "react-router-dom"
import "../style.css"
const Error = () => {

    const error = useRouteError()
  return (
    <div>
      <h1 style={{textAlign: "center"}} className="montserrat-body">
        Country Not Found! {error.status}
      </h1>
    </div>
  )
}

export default Error
