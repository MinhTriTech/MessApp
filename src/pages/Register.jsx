import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleRegister = async () => {
        const res = await fetch("http://localhost:8000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        localStorage.setItem("token", data.token);

        console.log("Đăng ký thành công", data);
    };

    return (
        <div className="auth-card">
            <h2 className="auth-title">Đăng ký</h2>
            <div className="auth-form">
                <input className="text-input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input className="text-input" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
                <input className="text-input" placeholder="Name" type="text" onChange={e => setName(e.target.value)} />
                <button className="btn" onClick={handleRegister}>Đăng ký</button>
            </div>
        </div>
    );
}