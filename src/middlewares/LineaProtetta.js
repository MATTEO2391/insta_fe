import { useNavigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Login from "../pages/Login";
import { useEffect } from "react";

const isAuth = () => {
    return JSON.parse(localStorage.getItem('utenteLoggato')) //prendo token dal localStorage
}

export const useSession = () => {  //lo esporto per poterlo utilizzare anche negli altri componenti
    const session = isAuth()
    const decodeSesssion = session ? jwtDecode(session) : null      //se c'è il token lo decodifico

    const navigate = useNavigate()     //fa navigatore tra le rotte dichiarate

    useEffect(() => {     //se non c'è la sessione torno alla login
        if (!session) {
            navigate('/', {replace: true})    //replace non fa tornare indietro con le frecce
        }
    }, [navigate, session])

    return decodeSesssion;
}

const LineaProtetta = () => {
    const auth = isAuth()

    return auth ? <Outlet/> : <Login/>  //se auth è vero ritorni i figli di Outlet altrimenti torni alla login
}

export default LineaProtetta