/*import React, {  useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { redirect,  useParams } from 'react-router-dom';



const Success = () => {
    const {token} = useParams()
    
    useEffect(() => {
        localStorage.setItem('utenteLoggato', JSON.stringify(token))
        
    }, [token])
    return(
        <>
            <Navbar />
        </>
    )
}

export default Success

<Route path="/success/:token" element={<Success />} />

const redirectLoginGithub = () => {
        window.location.href = `${process.env.REACT_APP_URL}/auth/github`
    }
    
    <div className="flex justify-center align-items-center mt-5">
                <button className="bg-green-600 p-5 rounded text-white" onClick={() => redirectLoginGithub()}>
                    LOGIN CON GITHUB
                </button>
            </div>*/