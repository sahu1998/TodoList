import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import ButtonGroup from "@mui/material/ButtonGroup";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Item = (props) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 1,
        marginTop: 1,
        marginBottom: 1,
        borderRadius: 1,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
};

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};
const AllTodoList = ({ data, removeTask, updateTask }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [taskIndex, setIndex] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      todo: "",
      todoDate: null,
    },
  });

  const onSubmit = (values) => {
    console.log("Task:- ", taskIndex);
    updateTask(taskIndex, values);
    reset();
    handleClose();
  };

  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ display: "grid", gridTemplateRows: "repeat(1fr)" }}>
        {data?.map((list, index) => {
          return (
            <Item key={index}>
              {/* <td>{index + 1}</td> */}

              {
                //Check if message failed
                list.title !== "" ? (
                  <span>{list.title} </span>
                ) : (
                  <span>No title</span>
                )
              }
              <span>{list.todo}</span>
              {/* <span>{new Date(list.todoDate).toLocaleDateString()}</span> */}
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  variant="contained"
                  startIcon={<DoneIcon />}
                  onClick={() => {
                    removeTask(index);
                  }}
                >
                  Done
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setIndex(index);
                    handleOpen();
                  }}
                >
                  Edit
                </Button>
              </ButtonGroup>
            </Item>
          );
        })}
      </Box>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                name="title"
                type="text"
                {...register("title")}
                sx={{ margin: 1 }}
              />

              <TextField
                id="outlined-basic"
                label="Discription"
                variant="outlined"
                type="text"
                name="todo"
                sx={{ margin: 1 }}
                {...register("todo", {
                  required: {
                    value: true,
                    message: "*discription is required",
                  },
                })}
                error={!!errors?.todo}
                helperText={errors?.todo?.message}
              />

              <Button
                variant="contained"
                type="submit"
                startIcon={<EditIcon />}
                sx={{ marginTop: 2 }}
              >
                Update
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
export default AllTodoList;
