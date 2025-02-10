import SideBarComponent from "@/components/SideBarComponent";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialogComponent from "@/components/common/ConfirmDialogComponent";

export const AdminDashboardPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleEdit = (id) => {
    console.log("Edit row:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete row:", id);
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      editable: false,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last name",
      editable: false,
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
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
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
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
            console.log("bruh");
          }}
          checkboxSelection
        />
      </Box>
    </>
  );
};
