import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import FileUploader from "./common/FileUploader";

const AddFilmDialogComponent = ({ open, onClose, onSubmit }) => {
  const [film, setFilm] = useState({
    title: "",
    description: "",
    director: "",
    thumbnail: null, // File object
  });

  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFileName(e.target.files[0].name);
    setFilm((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", film.title);
    formData.append("description", film.description);
    formData.append("director", film.director);
    if (film.thumbnail) {
      formData.append("thumbnail", film.thumbnail);
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Film</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Title"
          name="title"
          value={film.title}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="dense"
          label="Description"
          name="description"
          value={film.description}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="dense"
          label="Director"
          name="director"
          value={film.director}
          onChange={handleChange}
        />
        <Typography>Film thumbnail image</Typography>
        <FileUploader fileChange={handleFileChange} fileName={fileName} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Film
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFilmDialogComponent;
