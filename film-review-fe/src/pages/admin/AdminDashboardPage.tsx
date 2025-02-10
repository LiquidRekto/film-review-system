import SideBarComponent from "@/components/SideBarComponent";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialogComponent from "@/components/common/ConfirmDialogComponent";
import { FilmService } from "@/services/film.service";
import { AxiosResponse } from "axios";
import { API_R_200 } from "@/constants/error-codes";

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
      field: "thumbnail",
      headerName: "Film thumbnail image ",
      description: "Film image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          style={{ width: "50%", height: 40, borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      title: "My FIlm",
      description: "ABCXYZ",
      director: "Bob Smith",
      thumbnail: "/landscape-placeholder.svg",
    },
    { id: 2, lastName: "Lannister", firstName: "Cer", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmMultiDeleteOpen, setConfirmMultiDeleteOpen] = useState(false);

  const handleMultiDeleteConfirm = () => {
    setConfirmMultiDeleteOpen(false);
  };

  const handleDeleteConfirm = () => {
    setConfirmDeleteOpen(false);
  };

  const handleGetFilmList = async () => {
    /*
    const filters = {
      offset: (currentPage - 1) * PAGE_RECORDS,
      limit: PAGE_RECORDS,
      order: "ASC",
      orderBy: "createdAt",
    };
    */

    const res = (await FilmService.getAllFims()) as AxiosResponse;
    if (res.status === API_R_200) {
      //setFilmRecords(res.data.records);
      //console.log(res.data);
      //setTotalPages(res.data.totalPages);
    }
  };

  return (
    <>
      <Typography variant="h1"> Test Layout</Typography>
      <Button variant="contained">Add new film</Button>
      <Button
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
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection); // Stores selected row IDs
          }}
          checkboxSelection
        />
      </Box>
    </>
  );
};
