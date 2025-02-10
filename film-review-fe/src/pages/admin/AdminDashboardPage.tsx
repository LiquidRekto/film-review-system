import SideBarComponent from "@/components/SideBarComponent";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialogComponent from "@/components/common/ConfirmDialogComponent";
import { FilmService } from "@/services/film.service";
import { AxiosResponse } from "axios";
import { API_R_200 } from "@/constants/error-codes";
import AddFilmDialogComponent from "@/components/AddFilmDialogComponent";
import FilmEditDialogComponent from "@/components/FilmEditDialogComponent";

export const AdminDashboardPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleEdit = (id) => {
    console.log("Edit row:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete row:", id);
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "director",
      headerName: "Director(s)",
      flex: 1,
    },
    {
      field: "thumbnail_path",
      headerName: "Film thumbnail image ",
      description: "Film image",
      flex: 1,
      renderCell: (params) => {
        return (
          <img
            src={params.value}
            alt="Avatar"
            style={{ width: "50%", height: 40 }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleGetFilm(params.row.id)}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const [filmRows, setFilmRows] = useState([]);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [editFilmOpen, setEditFilmOpen] = useState(false);
  const [addFilmOpen, setAddFilmOpen] = useState(false);
  const [confirmMultiDeleteOpen, setConfirmMultiDeleteOpen] = useState(false);

  const handleMultiDeleteConfirm = async () => {
    const apiCalls = [];
    console.log(selectedRows);
    selectedRows.forEach((v) => {
      apiCalls.push(FilmService.deleteFilm(v));
    });
    Promise.all(apiCalls).then(() => {
      setConfirmMultiDeleteOpen(false);
    });
    await handleGetFilmList();
  };

  const handleAddFilm = async (data) => {
    console.log(data);
    const res = (await FilmService.createFilm(data)) as AxiosResponse;
    if (res.status === API_R_200) {
      handleGetFilmList();
    } else {
      console.log("fail");
    }
  };

  const [filmEdit, setFilmEdit] = useState({
    id: "",
    title: "",
    description: "",
    director: "",
  });

  const handleGetFilm = async (id) => {
    if (isNaN(Number(id))) {
      return;
    }
    const res = (await FilmService.getFilmById(Number(id))) as AxiosResponse;
    if (res.status === API_R_200) {
      const dat = res.data;
      console.log(res.data);
      setFilmEdit({
        id: dat.id,
        title: dat.title,
        description: dat.description,
        director: dat.director,
      });
    } else {
      console.error("Error while fetching");
    }
  };

  useEffect(() => {
    if (filmEdit.id) {
      console.log(filmEdit);
      setEditFilmOpen(true);
    }
  }, [filmEdit]);

  const handleEditFilm = async (data) => {
    const res = (await FilmService.updateFilm(
      Number(filmEdit.id),
      data
    )) as AxiosResponse;
    if (res.status === API_R_200) {
      handleGetFilmList();
    } else {
      console.log("fail");
    }
  };

  const handleGetFilmList = async () => {
    const res = (await FilmService.getAllFims()) as AxiosResponse;
    if (res.status === API_R_200) {
      setFilmRows(res.data.records);
    }
  };

  useEffect(() => {
    handleGetFilmList();
  }, []);

  return (
    <>
      <Typography variant="h3"> Film List</Typography>
      <Button
        sx={{ my: 2 }}
        onClick={() => setAddFilmOpen(true)}
        variant="contained"
      >
        Add new film
      </Button>
      <AddFilmDialogComponent
        open={addFilmOpen}
        onClose={() => setAddFilmOpen(false)}
        onSubmit={handleAddFilm}
      />
      <FilmEditDialogComponent
        film_ip={filmEdit}
        open={editFilmOpen}
        onClose={() => setEditFilmOpen(false)}
        onSubmit={handleEditFilm}
      />
      <Button
        sx={{ mx: 2, my: 2 }}
        onClick={() => setConfirmMultiDeleteOpen(true)}
        disabled={selectedRows.length <= 0}
        variant="contained"
      >
        Delete
      </Button>
      <ConfirmDialogComponent
        title="Are you sure?"
        description={`${selectedRows.length} film(s) will be deleted and this action is unrollbackable.`}
        confirmText="YES"
        cancelText="NO"
        open={confirmMultiDeleteOpen}
        onConfirm={handleMultiDeleteConfirm}
        onClose={() => setConfirmMultiDeleteOpen(false)}
      />
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={filmRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection); // Stores selected row IDs
          }}
          disableRowSelectionOnClick
          checkboxSelection
        />
      </Box>
    </>
  );
};
