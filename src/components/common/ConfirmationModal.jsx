import Button from "./Button";

const ConfirmationModal = ({
  isOpen,
  title,
  description,
  buttons,
  onBackdropClick,
  canCloseOnBackdrop = true,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (canCloseOnBackdrop && onBackdropClick) {
      onBackdropClick();
    }
  };

  return (
    <div
      className="onboarding-overlay"
      onClick={handleBackdropClick}
    >
      <div
        className="onboarding-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="onboarding-content">
          <h2 className="auth-title">{title}</h2>
          <p className="onboarding-text">{description}</p>

          <div className="onboarding-actions">
            {buttons.map((button, index) => (
              <Button
                key={index}
                onClick={button.onClick}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
