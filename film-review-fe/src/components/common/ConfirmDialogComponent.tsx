import { IFilm } from "@/interfaces/film";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";

interface Props {
  film: IFilm;
  confirmText: string;
  cancelText: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialogComponent: FC<Props> = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle id="alert-dialog-title">Edit film</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>{props.cancelText}</Button>
        <Button onClick={props.onConfirm} autoFocus>
          {props.confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialogComponent;
