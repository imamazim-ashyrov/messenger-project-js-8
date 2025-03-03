import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import {
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import sendAudio from "../assets/audios/sendAudio.mp3";
import { userName } from "./MessagesList";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import EmojiPicker from "emoji-picker-react";

const storage = getStorage();

const getCurrentTime = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const SendMessage = () => {
  const messagesData = useSelector((state) => state.messenger.messages);
  const [changeMessage, setChangeMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const sendMessageHandler = async () => {
    if (!changeMessage.trim() && !selectedFile) return;

    new Audio(sendAudio).play();
    let fileUrl = "";

    let messageToSend = changeMessage;
    if (changeMessage.trim().startsWith("http")) {
      messageToSend = `<a href="${changeMessage.trim()}" target="_blank">${changeMessage.trim()}</a>`; // Жөнөтүлгөн текстти <a> тегине айландыруу
    }

    if (selectedFile) {
      const fileRef = ref(storage, `uploads/${selectedFile.name}`);
      await uploadBytes(fileRef, selectedFile);
      fileUrl = await getDownloadURL(fileRef);
    }

    const message = {
      userName: userName,
      message: messageToSend,
      fileUrl,
      dateOfMessage: getCurrentTime(),
      index: messagesData.length + 1,
    };
    try {
      await addDoc(collection(db, "messenger"), message);
      setChangeMessage("");
      setSelectedFile(null);
      setFilePreview(null);
    } catch (error) {
      window.alert("Возникла ошибка при отправлении сообщения!");
    }
  };

  const handleFileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setFilePreview(fileURL);
    }
    handleFileMenuClose();
  };

  const handleOpenCamera = async () => {
    setOpenCamera(true);
    handleFileMenuClose();
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const handleCapturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      const file = new File([blob], "camera_photo.png", { type: "image/png" });
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    });
    setOpenCamera(false);
  };

  const handleEmojiSelect = (emojiData) => {
    setChangeMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <InputContainer>
      <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <InsertEmoticonIcon />
      </IconButton>
      {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiSelect} />}
      <IconButton onClick={handleFileMenuClick}>
        <AttachFileIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFileMenuClose}
      >
        <MenuItem>
          <label htmlFor="file-upload">
            <ImageIcon /> Фото жана видео
          </label>
          <input
            type="file"
            accept="image/*, video/*"
            id="file-upload"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </MenuItem>
        <MenuItem onClick={handleOpenCamera}>
          {" "}
          <CameraAltIcon /> Камера{" "}
        </MenuItem>
        <MenuItem>
          <label htmlFor="doc-upload">
            <DescriptionIcon /> Документ
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            id="doc-upload"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </MenuItem>
      </Menu>

      {filePreview && (
        <PrewFileContainer>
          <PreviewImage src={filePreview} alt="file preview" />
          {/* <IconButton onClick={sendMessageHandler}>Send Message</IconButton> */}
          <button onClick={sendMessageHandler}>Send</button>
        </PrewFileContainer>
      )}

      <StyledTextField
        value={changeMessage}
        onChange={(e) => setChangeMessage(e.target.value)}
        label="Введите сообщение"
        variant="outlined"
        fullWidth
      />

      <IconButton
        onClick={
          changeMessage.trim() || selectedFile ? sendMessageHandler : null
        }
      >
        {changeMessage.trim() || selectedFile ? <SendIcon /> : <MicIcon />}
      </IconButton>

      <Dialog open={openCamera} onClose={() => setOpenCamera(false)}>
        <DialogTitle>Сделать снимок</DialogTitle>
        <DialogContent>
          <video ref={videoRef} autoPlay style={{ width: "100%" }}></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCamera(false)}>Отмена</Button>
          <Button onClick={handleCapturePhoto}>Сделать снимок</Button>
        </DialogActions>
      </Dialog>
    </InputContainer>
  );
};

export default SendMessage;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
`;

const StyledTextField = styled(TextField)`
  flex: 1;
  .MuiOutlinedInput-root {
    border-radius: 20px;
  }
`;

const PrewFileContainer = styled.div`
  border: 1px solid white;
  padding: 2em;
  /* width: 500px; */
  margin-right: 10px;
  border-radius: 5px;
  position: absolute;
  bottom: 4em;
  left: 2em;
  z-index: 10;
  background-color: black;
  display: flex;
  gap: 2em;
  align-items: end;
  flex-direction: column;
  button {
    padding: 1em 2em
  }
`

const PreviewImage = styled.img`
  width: 300px;
`;
