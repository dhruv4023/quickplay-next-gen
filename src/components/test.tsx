import { Checkbox, FormControlLabel, MenuItem, TextField, Typography } from "@mui/material";

const getInputComponent = (key: string, value: any, handleChange: (e: any) => void) => {
  if (typeof value === "string") {
    return (
      <TextField
        label={key}
        name={key}
        value={value}
        onChange={handleChange}
        variant="outlined"
      />
    );
  }

  if (typeof value === "number") {
    return (
      <TextField
        label={key}
        name={key}
        type="number"
        value={value}
        onChange={handleChange}
        variant="outlined"
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <FormControlLabel
        control={
          <Checkbox checked={value} onChange={(e) => handleChange({ target: { name: key, value: e.target.checked } })} />
        }
        label={key}
      />
    );
  }

  if (value instanceof Date) {
    return (
      <TextField
        label={key}
        name={key}
        type="date"
        value={value.toISOString().split("T")[0]} // Format date as YYYY-MM-DD
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
    );
  }

  if (Array.isArray(value)) {
    return (
      <TextField
        label={key}
        name={key}
        value={value.join(", ")}
        onChange={(e) => handleChange({ target: { name: key, value: e.target.value.split(", ") } })}
        variant="outlined"
      />
    );
  }
if (typeof value === "object") {
  return (
    <TextField
      select
      label={key}
      name={key}
      value=""
      onChange={handleChange}
      variant="outlined"
    >
      {Object.entries(value).map(([key, val]) => (
        <MenuItem key={key} value={key}>
          {val as string}
        </MenuItem>
      ))}
    </TextField>
  );
}


  return <Typography variant="body1">{`Unsupported type for ${key}`}</Typography>;
};

export default getInputComponent;