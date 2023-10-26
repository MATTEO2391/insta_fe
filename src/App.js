import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import LineaProtetta from "./middlewares/LineaProtetta"
import Registrati from "./pages/Registrati"
import Success from "./pages/Succes"



const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />

                <Route path="/registrati" element={<Registrati />} />
                
                <Route element={<LineaProtetta />}>  
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App


