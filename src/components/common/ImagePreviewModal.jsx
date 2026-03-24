import { useEffect } from "react";

export default function ImagePreviewModal({
  previewImage,
  onClose,
  modalMaxWidth = "min(860px, 94vw)",
  modalMaxHeight = "88vh",
  imageMaxWidth = "min(840px, 92vw)",
  imageMaxHeight,
}) {
  useEffect(() => {
    if (!previewImage) {
      return undefined;
    }

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [previewImage, onClose]);

  if (!previewImage) {
    return null;
  }

  return (
    <div className="image-preview-overlay" onClick={onClose}>
      <div
        className="image-preview-bubble"
        style={{
          "--image-preview-modal-max-width": modalMaxWidth,
          "--image-preview-modal-max-height": modalMaxHeight,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={previewImage.url}
          alt={previewImage.name || "Image preview"}
          className="image-preview-image"
          style={{
            "--image-preview-image-max-width": imageMaxWidth,
            "--image-preview-image-max-height": imageMaxHeight || `calc(${modalMaxHeight} - 16px)`,
          }}
        />
      </div>
    </div>
  );
}
