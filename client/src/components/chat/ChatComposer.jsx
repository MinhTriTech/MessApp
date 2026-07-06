import { useState } from "react";
import attachFileIcon from "../../assets/attach-file.png";
import attachFileHoverIcon from "../../assets/attach-file-hover.png";
import TextInput from "../common/TextInput";
import Button from "../common/Button";

export default function ChatComposer({
  input,
  onInputChange,
  onSend,
  fileInputRef,
  onFileChange,
  onPickFile,
}) {
  const [isFileButtonHovered, setIsFileButtonHovered] = useState(false);

  return (
    <div className="message-input-row">
      <TextInput
        value={input}
        onChange={onInputChange}
        placeholder="Nhập tin nhắn..."
      />
      <input
        ref={fileInputRef}
        type="file"
        className="file-input-hidden"
        onChange={onFileChange}
      />
      <Button
        onClick={onPickFile}
        className="btn-file"
        type="button"
        onMouseEnter={() => setIsFileButtonHovered(true)}
        onMouseLeave={() => setIsFileButtonHovered(false)}
      >
        <img
          src={isFileButtonHovered ? attachFileHoverIcon : attachFileIcon}
          alt="Đính kèm file"
        />
      </Button>
      <Button onClick={onSend}>
        Gửi
      </Button>
    </div>
  );
}
