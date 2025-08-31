import { TextField } from "@mui/material";
import FlexEvenlyColumn from "../../components/FlexEvenlyColumn";

interface FormFieldsProps {
  onChangehandle: (value: string, field: string) => void;
  values: any;
  isRegister: boolean;
  isLogin: boolean;
}

const FormFields: React.FC<FormFieldsProps> = ({ onChangehandle, values, isRegister, isLogin }) => {
  return (
    <FlexEvenlyColumn sx={{ gap: 2 }}>
      {isRegister && (
        <>
          <TextField
            variant="outlined"
            required
            label="First Name"
            onChange={(e) => onChangehandle(e.target.value, "firstName")}
            value={values.firstName}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <TextField
            variant="outlined"
            required
            label="Last Name"
            onChange={(e) => onChangehandle(e.target.value, "lastName")}
            value={values.lastName}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </>
      )}
      <TextField
        variant="outlined"
        required
        type="text"
        label="Phone Number"
        onChange={(e) => {
          onChangehandle(e.target.value, "phone");
        }}
        value={values.phone}
        fullWidth
        helperText="Enter 10 digit mobile number"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
      {(isLogin || isRegister) && (
        <TextField
          variant="outlined"
          required
          type="password"
          label="Password"
          onChange={(e) => onChangehandle(e.target.value, "password")}
          value={values.password}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
      )}
      {(isRegister) && (
        <TextField
          variant="outlined"
          required
          type="password"
          label="Confirm Password"
          onChange={(e) => onChangehandle(e.target.value, "confirmPassword")}
          value={values.confirmPassword}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
      )}
    </FlexEvenlyColumn>
  );
};

export default FormFields;
