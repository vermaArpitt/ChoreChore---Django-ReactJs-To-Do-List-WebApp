import { formToJSON } from "axios"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


export default function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        try{
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false)
        }
    };

    return <form onSubmit={handleSubmit} className="form-container">
        <h1> {name} </h1>
        <input 
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            placeholder="Username"
        />
        <input 
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            placeholder="Password"
        />
        <button className="form-submit" type="submit">
            {name}
        </button>
    </form>
};