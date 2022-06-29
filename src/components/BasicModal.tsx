import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

let day = moment().format("dddd").toLowerCase();

const isOpen = (openingTine, closingTime) => {
  const beginningTime = moment(openingTine, "h:mma");
  const endTime = moment(closingTime, "h:mma");
  const now = moment(moment().format("LT"), "h:mma");
  return now.isBetween(beginningTime, endTime);
};

export const BasicModal = ({ isModalOpen, onCloseModal, rowData }) => (
  <Modal open={isModalOpen} onClose={onCloseModal}>
    <>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: "75%",
          height: 600,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container spacing={2}>
              <Grid item xs={8}>
                <Img alt="complex" src={rowData?.row?.logoImg} />
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {rowData?.row?.review}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {rowData?.row?.hours[day].opens_at}
                  {rowData?.row?.hours[day].closes_at}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`The store is ${
                    isOpen(
                      rowData?.row?.hours[day].opens_at,
                      rowData?.row?.hours[day].closes_at
                    )
                      ? "open"
                      : "closed"
                  }`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={onCloseModal}>Stäng</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  </Modal>
);
