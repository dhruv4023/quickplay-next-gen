import { Box, Card, CardContent, Chip, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { SessionTemplate } from "../../schemas/SessionTemplate/SessionTemplate";
import EditableData from "../../components/EditableData";
import FlexBetween from "../../components/Containers/FlexBetween";
import { useState } from "react";
import { Close, Delete, Edit, Save } from "@mui/icons-material";
import { locationCardStyle } from "../OwnerLocation/Owner.css";
import CourtsTemplate from "./CourtsTemplate";
import SelectLocationAndSport from "./SelectLocationAndSport";

interface EditSessionTemplateProps {
  sessionTemplate: SessionTemplate;
  onSave: (template: SessionTemplate) => void;
  openEdit: string | null;
  setOpenEdit: (open: string | null) => void;
  onDelete: (id: string) => void;
}

const EditSessionTemplate = ({
  sessionTemplate,
  onSave,
  openEdit,
  setOpenEdit,
  onDelete
}: EditSessionTemplateProps) => {
  const [template, setTemplate] = useState<SessionTemplate>(sessionTemplate);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const frequencies = new Map([
    ["daily", "Daily"],
    ["weekly", "Weekly"],
    ["monthly", "Monthly"]
  ]);

  return (
    <Card sx={locationCardStyle(useTheme())}>
      <CardContent sx={{ p: 3 }}>
        <FlexBetween>
          {
            openEdit === template._id ? (<>
              <IconButton sx={{ color: "green" }} onClick={() => onSave(template)}>
                <Save />
              </IconButton>
              <IconButton sx={{ color: "red" }} onClick={() => setOpenEdit(null)}>
                <Close />
              </IconButton>
            </>) : (<>
              <IconButton sx={{ color: "blue" }} onClick={() => setOpenEdit(template._id)} disabled={openEdit !== null}>
                <Edit />
              </IconButton>
              <IconButton sx={{ color: "red" }} onClick={() => onDelete(template._id)} disabled={openEdit !== null}>
                <Delete />
              </IconButton>
            </>)
          }
        </FlexBetween>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <EditableData
            isEdit={openEdit === template._id}
            data={template}
            setData={setTemplate}
            fieldName="templateName"
            validation={{ required: true }}
          />

          <SelectLocationAndSport
            isEdit={openEdit === template._id}
            data={template}
            setData={setTemplate}
          />

          <EditableData
            isEdit={openEdit === template._id}
            data={template}
            setData={setTemplate}
            fieldName="startTime"
            inputType="DATETIME"
            validation={{ required: true, pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$", errorMessage: "Please enter time in HH:MM format" }}
          />

          <EditableData
            isEdit={openEdit === template._id}
            data={template}
            setData={setTemplate}
            fieldName="endTime"
            inputType="DATETIME"
            validation={{ required: true, pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$", errorMessage: "Please enter time in HH:MM format" }}
          />
          <CourtsTemplate
            isEdit={openEdit === template._id}
            data={template}
            setData={setTemplate}
          />
          <EditableData
            isEdit={openEdit === template._id}
            data={template}
            setData={setTemplate}
            fieldName="frequency"
            inputType="SELECT"
            options={frequencies}
          />
          {
            template?.dayOfWeek &&
            <MultiSelectComponent
              title="Days of Week"
              isEdit={openEdit === template._id}
              allListData={daysOfWeek}
              currentList={template.dayOfWeek}
              setCurrentList={(list: string[]) => setTemplate({ ...template, dayOfWeek: list })}
            />
          }
        </Box>
      </CardContent>
    </Card>
  );
};

export default EditSessionTemplate;
const MultiSelectComponent = ({
  title,
  isEdit,
  allListData,
  setCurrentList,
  currentList
}: {
  title: string;
  isEdit: boolean;
  allListData: string[];
  currentList: string[];
  setCurrentList: (list: string[]) => void;
}) => {
  const theme = useTheme();

  const handleClick = (item: string) => {
    const isSelected = currentList.includes(item);
    if (isSelected) {
      setCurrentList(currentList.filter(s => s !== item));
    } else {
      setCurrentList([...currentList, item]);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {isEdit ? (
          allListData?.map((item, index) => {
            const isSelected = currentList?.includes(item);
            return (
              <Chip
                key={index}
                label={item}
                onClick={() => handleClick(item)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? theme.palette.primary.main
                    : 'rgba(25, 118, 210, 0.08)',
                  color: isSelected ? 'white' : 'inherit',
                  '& .MuiChip-icon': {
                    color: isSelected
                      ? 'white'
                      : theme.palette.primary.main
                  }
                }}
              />
            );
          })
        ) : (
          currentList?.map((item, index) => (
            <Chip
              key={index}
              label={item}
              sx={{
                borderRadius: '12px',
                background: 'rgba(25, 118, 210, 0.08)',
                '& .MuiChip-icon': {
                  color: theme.palette.primary.main
                }
              }}
            />
          ))
        )}
      </Stack>
    </Box>
  );
};
