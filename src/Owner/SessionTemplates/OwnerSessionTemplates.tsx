import WidgetsOnPage from "../../components/Containers/WidgetsOnPage";
import { Typography, Button, Grid, Box } from "@mui/material";
import { isApiResponse } from "../../schemas/Response.schema";
import { useCallback, useEffect, useState } from "react";
import { getAllSessionTemplatesApi, createSessionTemplateApi, updateSessionTemplateApi, deleteSessionTemplateApi } from "./session.template";
import { SessionTemplate } from "../../schemas/SessionTemplate/SessionTemplate";
import { useAlert } from "../../utils/Alert";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import EditSessionTemplate from "./EditSessionTemplate";
import FlexBetween from "../../components/Containers/FlexBetween";
import Loading from "../../components/Loading/Loading";


const OwnerSessionTemplates = () => {
  const [sessionTemplates, setSessionTemplates] = useState<SessionTemplate[]>([]);
  const [openEdit, setOpenEdit] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const token = useSelector((state: RootState) => state.auth.token);

  const getAllSessionTemplatesCallback = useCallback(async () => {
    if (!token) return;

    const response = await getAllSessionTemplatesApi(token);
    if (isApiResponse(response)) {
      setSessionTemplates(response.data as SessionTemplate[]);
      showAlert(response.message, "success");
    } else {
      showAlert(response.message, "error");
    }
  }, []);

  const handleSave = async (template: SessionTemplate) => {
    if (!token) return;
    try {
      setLoading(true);
      const response = template._id === "NEW"
        ? await createSessionTemplateApi(token, template)
        : await updateSessionTemplateApi(token, template);

      if (isApiResponse(response)) {
        showAlert(response.message, "success");
        getAllSessionTemplatesCallback();
        setOpenEdit(null);
      } else {
        showAlert(response.message, "error");
      }
    } catch (error) {
      showAlert("Error saving template", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (templateId: string) => {
    if (!token) return;
    try {
      setLoading(true);
      if (templateId === "NEW") {
        setSessionTemplates(sessionTemplates.filter((template) => template._id !== "NEW"));
      } else {
        const response = await deleteSessionTemplateApi(token, templateId);
        if (isApiResponse(response)) {
          showAlert(response.message, "success");
          setSessionTemplates(sessionTemplates.filter((template) => template._id !== templateId));
          setOpenDelete(false);
        } else {
          showAlert(response.message, "error");
        }
      }
    } catch (error) {
      showAlert("Error deleting template", "error");
    } finally {
      setLoading(false);
    }
  };

  const onCreateNewTemplate = () => {
    setSessionTemplates([...sessionTemplates, {
      _id: "NEW",
      sportId: "",
      templateName: "",
      courts: [],
      dayOfWeek: [],
      startTime: "",
      endTime: "",
      frequency: "",
    }]);
    setOpenEdit("NEW");
  };

  useEffect(() => {
    getAllSessionTemplatesCallback();
  }, [getAllSessionTemplatesCallback]);

  return (
    <WidgetsOnPage
      isSidebarShouldBeOn={true}
      components={
        <Box sx={{ p: 3 }}>
          {loading && <Loading />}
          <FlexBetween sx={{ p: 3 }}>
            <Typography variant="h4">Session Templates</Typography>
            <Button
              variant="contained"
              disabled={loading || openEdit !== null}
              onClick={() => onCreateNewTemplate()}
              sx={{ mt: 2 }}
            >
              Create New Template
            </Button>
          </FlexBetween>
          {sessionTemplates && (sessionTemplates.length > 0 && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {sessionTemplates.map((template, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <EditSessionTemplate
                    openEdit={openEdit}
                    key={template._id}
                    sessionTemplate={template}
                    onSave={handleSave}
                    setOpenEdit={setOpenEdit}
                    onDelete={handleDelete}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Box>
      }
    />
  )
}

export default OwnerSessionTemplates;