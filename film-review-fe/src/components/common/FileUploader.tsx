import { FC } from "react";
import { Button, Typography } from "@mui/material";

interface Props {
  fileChange: (e: any) => void;
  fileName: string;
}

const FileUploader: FC<Props> = (props) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }} // Hide default file input
        accept="image/*"
        onChange={props.fileChange}
      />
      <label htmlFor="fileInput">
        <Button variant="contained" component="span">
          Select File
        </Button>
      </label>
      <Typography variant="body1">
        {props.fileName || "No file chosen"}
      </Typography>
    </div>
  );
};

export default FileUploader;
