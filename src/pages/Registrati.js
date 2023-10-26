import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Registrati = () => {
    const [formData, setFormData] = useState({})
    console.log(formData)

    const navigate = useNavigate()

    const tornaLogin = () => {
        navigate('/')
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/users/create`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(formData)
            })
            window.location.reload()
            return response.json()

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Navbar />

            <div className="my-5">
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col justify-center items-center gap-4">
                    <input
                        className="w-[400px] p-1 rounded border-2"
                        placeholder="FirstName"
                        name="firstName"
                        type="text"
                        onChange={(e) => setFormData({
                            ...formData,
                            firstName: e.target.value
                        })}
                    />
                    <input
                        className="w-[400px] p-1 rounded border-2"
                        placeholder="lastName "
                        name="lastName"
                        type="text"
                        onChange={(e) => setFormData({
                            ...formData,
                            lastName: e.target.value
                        })}
                    />
                    <input
                        className="w-[400px] p-1 rounded border-2"
                        placeholder="email"
                        name="email"
                        type="text"
                        onChange={(e) => setFormData({
                            ...formData,
                            email: e.target.value
                        })}
                    />
                    <input
                        className="w-[400px] p-1 rounded border-2"
                        placeholder="password"
                        name="password"
                        type="password"
                        onChange={(e) => setFormData({
                            ...formData,
                            password: e.target.value
                        })}
                    />

                    <div className="flex gap-2">
                        <button type="submit" className="p-2 bg-blue-800 hover:bg-blue-500 text-white rounded">
                            REGISTRATI
                        </button>
                    </div>
                </form>
                <div className="flex justify-center align-items-center mt-5">
                <button className="bg-green-600 p-5 rounded text-white" onClick={() => tornaLogin()}>
                    torna alla login
                </button>
            </div>
            </div>
        </>
    )


}

export default Registrati