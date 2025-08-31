import React, { useState, useMemo } from "react";
import FlexBetween from "./Containers/FlexBetween";
import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { getLocalDateTime } from "../utils/dateTime.util";
import DateTimeField from "./DateTimeField";

interface ValidationProps {
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
}

type BaseProps<T> = {
  label?: string;
  isEdit?: boolean;
  showFieldName?: boolean;
  data: Record<string, any>;
  fieldName: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  inputType?: "text" | "number" | "email" | "password" | "SELECT" | "NONE" | "DATE" | "DATETIME";
  diffStyle?: React.CSSProperties;
  validation?: ValidationProps;
  width?: string | number;
  minDateTime?: string;
};

type EditableDataProps<T> =
  | (BaseProps<T> & { inputType: "SELECT"; options: Map<string | number, string> })
  | (BaseProps<T> & { inputType?: Exclude<BaseProps<T>["inputType"], "SELECT">; options?: never });

const EditableData = <T,>({
  label,
  isEdit = false,
  showFieldName = true,
  data,
  fieldName,
  setData,
  inputType = "text",
  minDateTime,
  options,
  diffStyle = {},
  validation = {},
  width = "20rem",
}: EditableDataProps<T>) => {
  const [error, setError] = useState<string>("");

  const memoizedOptions = useMemo(() => options ?? new Map(), [options]);

  const validateInput = (value: any): boolean => {
    if (validation?.required && (value === "" || value === undefined || value === null)) {
      setError("This field is required.");
      return false;
    }

    if (validation?.pattern && typeof value === "string" && !new RegExp(validation.pattern).test(value)) {
      setError(validation.errorMessage || "Invalid value.");
      return false;
    }

    setError("");
    return true;
  };

  const handleChange = (value: String | number) => {

    if (inputType === "number") {
      value = value ? Number(value) : "";
    } else {
      value = value.toString().trim();
    }

    setData((prevData) => ({ ...prevData, [fieldName]: value, }));

    if (error) validateInput(value);
  };

  return (
    <FlexBetween width={width} gap={1} mx={2}>
      {showFieldName && (
        <Typography variant="body1" fontWeight={700}>
          {label ||String(fieldName)
            .replace(/_/g, " ")
            .replace(/^\w/, (c) => c.toUpperCase())}
        </Typography>
      )}

      {isEdit && inputType !== "NONE" ? (
        inputType === "SELECT" ? (
          <Select
            variant="standard"
            name={fieldName}
            value={data[fieldName] ?? ""}
            onChange={(e) => handleChange(e.target.value)}
            sx={{ width: "100%", fontSize: "1rem" }}
          >
            {[...memoizedOptions].map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        )
          : inputType === "DATE" || inputType === "DATETIME" ?
            (<DateTimeField
              value={data && fieldName in data ? data[fieldName] : ""}
              onChange={handleChange}
              format={inputType === "DATE" ? "DATE" : "DATETIME"}
              minDateTime={minDateTime}
              customStyle={{
                ...diffStyle,
              }}
            />)
            : (
              <TextField
                variant="standard"
                name={fieldName}
                value={data[fieldName] ?? ""}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={(e) => isEdit && validateInput(e.target.value)}
                type={inputType}
                inputProps={{
                  style: {
                    padding: 0,
                    fontSize: "1rem",
                    lineHeight: 1.5,
                  },
                }}
                placeholder={label || String(fieldName)}
                sx={{ width: "100%" }}
                error={Boolean(error)}
                helperText={error}
              />
            )
      ) : (
        <Typography variant="body1" sx={{ width: "100%", lineHeight: 1.5, ...diffStyle }}>
          {inputType === "SELECT" 
            ? memoizedOptions.get(data[fieldName]) || "N/A"
            : (inputType === "DATE" || inputType === "DATETIME")
              ? getLocalDateTime(data[fieldName], inputType)
              : data[fieldName] ?? "N/A"}

        </Typography>
      )}
    </FlexBetween>
  );
};

export default React.memo(EditableData) as <T>(props: EditableDataProps<T>) => React.ReactElement;
