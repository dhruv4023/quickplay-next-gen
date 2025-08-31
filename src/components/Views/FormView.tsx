import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, Grid2, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import {
    AddRounded,
    ArrowBack,
    Cancel,
    Delete,
    Edit,
} from "@mui/icons-material";
import { useAlert } from "../../utils/Alert";
import FlexBetween from "../Containers/FlexBetween";
import FlexEvenly from "../FlexEvenly";
import FlexibleGrid from "../Containers/FlexibleGrid";
import EditableData from "../EditableData";

interface FormViewProps<T extends Record<string, any>> {
    ID: string;
    data: T;
    setData: React.Dispatch<React.SetStateAction<T>>;
}


const FormView: React.FC<FormViewProps<Record<string, any>>> = ({ ID, data, setData }) => {
    const { palette } = useTheme();
    const [edit, setEdit] = useState(false);

    return (
        <FlexBetween flexDirection={"column"}>
            <FlexBetween
                px={2}
                py={1}
                sx={{
                    boxShadow: `0px .5px 2px ${palette.grey[400]}`, // Uses MUI's color system
                }}
            >
                <Box>
                    <ArrowBack />
                </Box>
                <FlexEvenly gap={3}>
                    {edit ? (
                        <>
                            <Cancel sx={{ color: "red" }} />
                            <IconButton onClick={() => setEdit(false)}>
                                <CloudUploadIcon sx={{ color: "white" }} />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <AddRounded sx={{ color: "green" }} />
                            <IconButton onClick={() => setEdit(true)}>
                                <Edit sx={{ color: "blue" }} />
                            </IconButton>
                            <Delete sx={{ color: "red" }} />
                            <CloudDoneIcon sx={{ color: "green" }} />
                        </>
                    )}
                </FlexEvenly>
            </FlexBetween>
            <FlexibleGrid minWidth="40%">
                <EditableData isEdit={edit} fieldName={"category"} inputType={"SELECT"} options={useMemo(() => new Map([["1", "red"], ["2", "blue"]]), [])} data={data} setData={setData} />
                <EditableData isEdit={edit} fieldName={"category"} inputType={"SELECT"} options={useMemo(() => new Map([["1", "red"], ["2", "blue"]]), [])} data={data} setData={setData} />
            </FlexibleGrid>
        </FlexBetween>
    );
};

export default FormView;
