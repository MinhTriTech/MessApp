import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ConfirmationModal from "../components/common/ConfirmationModal";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { setUser } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin");
            setShowErrorModal(true);
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMessage(data.message || "Đăng nhập thất bại");
                setShowErrorModal(true);
                return;
            }

            localStorage.setItem("token", data.token);
            setUser(data.user);
            navigate("/");
        } catch (error) {
            setErrorMessage("Có lỗi xảy ra, vui lòng thử lại");
            setShowErrorModal(true);
        }
    };


    return (
        <>
            <div className="auth-card">
                <h2 className="auth-title">Đăng nhập</h2>
                <div className="auth-form">
                    <TextInput 
                        placeholder="Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <TextInput 
                        placeholder="Mật khẩu" 
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <Button onClick={handleLogin}>Đăng nhập</Button>
                    <p className="auth-switch-text">
                        Chưa có tài khoản? <Link to="/register" className="auth-switch-link">Đăng ký</Link>
                    </p>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showErrorModal}
                title="Thông báo"
                description={errorMessage}
                buttons={[
                    {
                        text: "Đóng",
                        onClick: () => setShowErrorModal(false)
                    }
                ]}
                onBackdropClick={() => setShowErrorModal(false)}
                canCloseOnBackdrop={true}
            />
        </>
    );
}