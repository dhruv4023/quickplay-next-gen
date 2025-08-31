import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { convertLocalToUTC, convertUTCToLocal } from "../utils/dateTime.util";

interface DateTimeFieldProps {
  value?: string;
  onChange: (value: string) => void;
  format?: "DATE" | "DATETIME";
  minDateTime?: string;
  customStyle?: React.CSSProperties;
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({
  value,
  onChange,
  format = "DATETIME",
  minDateTime,
  customStyle = {},
}) => {
  const [localDateTime, setLocalDateTime] = useState<Date | null>(null);

  useEffect(() => {
    if (value) {
      setLocalDateTime(new Date(convertUTCToLocal(value)));
    }
  }, [value]);

  const handleChange = (date: Date | null) => {
    if (!date) return;
    const utc = convertLocalToUTC(date.toISOString());
    setLocalDateTime(date);
    onChange(utc);
  };

  const minDate = minDateTime
    ? new Date(convertUTCToLocal(minDateTime))
    : undefined;

  const sharedProps = {
    value: localDateTime,
    onChange: handleChange,
    minDateTime: minDate,
    ampm: false,
    minutesStep: 5,
    slots: {
      textField: (params: any) => (
        <TextField
          {...params}
          variant="standard"
          fullWidth
          sx={{
            width: "100%",
            height: "100%",
            ...customStyle,
          }}
        />
      ),
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {format === "DATE" ? (
        <DatePicker {...sharedProps} minDate={minDate} />
      ) : (
        <DateTimePicker {...sharedProps} />
      )}
    </LocalizationProvider>
  );
};

export default DateTimeField;
