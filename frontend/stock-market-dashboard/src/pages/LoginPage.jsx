import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {

    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        alert("Login Successful");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;