import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const style = {
  display: "grid",
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "grey.100"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
  border: "1px solid",
  borderColor: (theme) =>
    theme.palette.mode === "dark" ? "grey.800" : "grey.300",
  p: 1,
  paddingTop: 2,
  borderRadius: 2,
  fontSize: "0.875rem",
  fontWeight: "700",
};

const TodoInput = ({ insertData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    console.log(
      new Date(values?.todoDate).toLocaleDateString(),
      "Task:- ",
      values?.todoDate
    );
    insertData(values);
    reset();
  };

  return (
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

        {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <Controller
                        control={control}
                        name="todoDate"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <DatePicker
                                onChange={onChange}
                                onBlur={onBlur}
                                // selected={new Date(value)}
                                value={value}
                                renderInput={(params) => <TextField sx={{margin:1}} {...params} />}
                            />
                        )}
                    />
                    <DatePicker
                        label="Date"
                        value={todoDate}
                        onChange={(newValue) => {
                            console.log("hello -> ",newValue);
                            setTodoDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} name="todoDate" {...register('todoDate')}/>}
                    />
                </LocalizationProvider> */}

        <Button
          variant="contained"
          type="submit"
          startIcon={<AddIcon />}
          sx={{ marginTop: 2 }}
        >
          Add
        </Button>
      </form>
    </Box>
  );
};

export default TodoInput;
