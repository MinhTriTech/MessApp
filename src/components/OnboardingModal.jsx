import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ConfirmationModal from "./common/ConfirmationModal";
import TextInput from "./common/TextInput";
import Button from "./common/Button";

const OnboardingModal = () => {
  const { user, setUser } = useAuth();
  const token = localStorage.getItem("token");

  const [step, setStep] = useState(
    !user.is_verified ? "verify" : "username"
  );

  const [name, setName] = useState("");
  const [showEmailVerifyModal, setShowEmailVerifyModal] = useState(
    !user.is_verified
  );

  // gửi email
  const handleSendEmail = async () => {
    if (!token) return;

    await fetch("http://localhost:8000/auth/send-verify-email", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    alert("Đã gửi email!");
  };

  // fake verify (dev mode)
  const handleVerified = async () => {
    if (!token) return;

    const res = await fetch("http://localhost:8000/auth/getMe", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      alert("Không thể kiểm tra trạng thái xác nhận email");
      return;
    }

    const updatedUser = await res.json();
    setUser(updatedUser);

    if (updatedUser.is_verified) {
      setShowEmailVerifyModal(false);
      setStep("username");
    }
  };

  // submit username
  const handleUsername = async () => {
    if (!token) return;

    const res = await fetch("http://localhost:8000/auth/updateName", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      alert("Cập nhật username thất bại");
      return;
    }

    const updatedUser = await res.json();
    setUser(updatedUser);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showEmailVerifyModal && step === "verify"}
        title="Xác nhận email"
        description="Vui lòng kiểm tra email để xác nhận tài khoản"
        buttons={[
          {
            text: "Gửi lại email",
            onClick: handleSendEmail
          },
          {
            text: "Tôi đã xác nhận",
            onClick: handleVerified
          }
        ]}
        canCloseOnBackdrop={false}
      />

      {step === "username" && (
        <div className="onboarding-overlay">
          <div className="onboarding-card">
            <div className="onboarding-content">
              <h2 className="auth-title">Nhập username</h2>

              <input
                className="text-input"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Button onClick={handleUsername}>
                Hoàn tất
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingModal;