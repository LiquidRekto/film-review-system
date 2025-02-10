import SideBarComponent from "@/components/SideBarComponent";
import { Box, Button, IconButton, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialogComponent from "@/components/common/ConfirmDialogComponent";
import { FilmService } from "@/services/film.service";
import { AxiosResponse } from "axios";
import { API_R_200 } from "@/constants/error-codes";
import AddFilmDialogComponent from "@/components/AddFilmDialogComponent";
import { RatingService } from "@/services/rating.service";

const AdminRatingListPage = () => {
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
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
    },
    {
      field: "movie",
      headerName: "Movie",
      flex: 1,
    },
    {
      field: "rankScore",
      headerName: "Ranking score",
      flex: 1,
    },
    {
      field: "comment",
      headerName: "Comment",
      flex: 1,
    },
  ];

  const [ratingRows, setRatingRows] = useState([]);

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

  const [confirmMultiDeleteOpen, setConfirmMultiDeleteOpen] = useState(false);

  const handleMultiDeleteConfirm = async () => {
    const apiCalls = [];
    console.log(selectedRows);
    selectedRows.forEach((v) => {
      apiCalls.push(RatingService.deleteRating(v));
    });
    Promise.all(apiCalls).then(() => {
      handleGetRatingList();
      setConfirmMultiDeleteOpen(false);
    });
    await handleGetRatingList();
  };

  const handleGetRatingList = async () => {
    console.log("BRUH");
    const filters = {
      //offset: (currentPage - 1) * PAGE_RECORDS,
      //limit: PAGE_RECORDS,
      //order: "ASC",
      //orderBy: "createdAt",
    };

    const res = (await RatingService.getAllRatings(filters)) as AxiosResponse;
    if (res.status === API_R_200) {
      const processedData = res.data.records.map((v) => {
        return {
          id: v.id,
          username: v.user.username,
          fullName: `${v.user.first_name} ${v.user.last_name}`,
          movie: v.films.title,
          rankScore: v.rating_score,
          comment: v.comment,
        };
      });
      setRatingRows(processedData);
      //setFilmRecords(res.data.records);
      //console.log(res.data);
      //setTotalPages(res.data.totalPages);
    }
  };

  useEffect(() => {
    handleGetRatingList();
  }, []);

  return (
    <>
      <Typography variant="h3"> Rating List</Typography>
      <Button
        sx={{ my: 2 }}
        onClick={() => setConfirmMultiDeleteOpen(true)}
        disabled={selectedRows.length <= 0}
        variant="contained"
      >
        Delete
      </Button>
      <ConfirmDialogComponent
        title="Are you sure?"
        description={`${selectedRows.length} ratings(s) will be deleted and this action is unrollbackable.`}
        confirmText="YES"
        cancelText="NO"
        open={confirmMultiDeleteOpen}
        onConfirm={handleMultiDeleteConfirm}
        onClose={() => setConfirmMultiDeleteOpen(false)}
      />
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={ratingRows}
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

export default AdminRatingListPage;
