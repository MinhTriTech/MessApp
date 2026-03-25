import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/common/ConfirmationModal";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { setUser } = useAuth();

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin");
            setShowErrorModal(true);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Mật khẩu nhập lại không khớp");
            setShowErrorModal(true);
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMessage(data.message || "Đăng ký thất bại");
                setShowErrorModal(true);
                return;
            }

            localStorage.setItem("token", data.token);
            setUser(data.user);
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage("Có lỗi xảy ra, vui lòng thử lại");
            setShowErrorModal(true);
        }
    };


    return (
        <>
            <div className="auth-card">
                <h2 className="auth-title">Đăng ký</h2>
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
                    <TextInput 
                        placeholder="Nhập lại mật khẩu" 
                        type="password" 
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} 
                    />
                    <Button onClick={handleRegister}>Đăng ký</Button>
                    <p className="auth-switch-text">
                        Đã có tài khoản? <Link to="/login" className="auth-switch-link">Đăng nhập</Link>
                    </p>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showSuccessModal}
                title="Đăng ký thành công"
                description="Tài khoản của bạn đã được tạo thành công. Vui lòng đăng nhập để tiếp tục."
                buttons={[
                    {
                        text: "Đăng nhập ngay",
                        onClick: () => navigate("/login")
                    },
                    {
                        text: "Quay về",
                        onClick: () => {
                            setShowSuccessModal(false);
                            setEmail("");
                            setPassword("");
                            setConfirmPassword("");
                        }
                    }
                ]}
                onBackdropClick={() => {
                    setShowSuccessModal(false);
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                }}
                canCloseOnBackdrop={true}
            />

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