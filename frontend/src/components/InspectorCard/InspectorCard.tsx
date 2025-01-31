import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Chip,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EventIcon from "@mui/icons-material/Event";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";
import { deleteInspector } from "../../store/inspectors/inspectorSlice.ts";
import DeleteModal from "../DeleteModal/DeleteModal.tsx";
import InspectorModal from "../InspectorModal/InspectorModal.tsx";
import dayjs from "dayjs";
import {Inspector} from "../../types/Inspector/inspector.type.ts";

type Properties = {
  inspector: Inspector;
  index: number;
};

const InspectorCard: React.FC<Properties> = ({ inspector, index }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [inspectorData, setInspectorData] = useState({
    name: inspector.name,
    email: inspector.email,
    phone_number: inspector.phone_number,
    address: inspector.address,
    licenses: inspector.licenses,
  });

  const handleToggleOpen = () => {
    setIsOpened(!isOpened);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteInspector(inspector.id as string));
    setIsDeleteModalOpen(false);
  };

  const handleEditClick = () => {
    setInspectorData({
      name: inspector.name,
      email: inspector.email,
      phone_number: inspector.phone_number,
      address: inspector.address,
      licenses:
          inspector.licenses ?? [
            { license_type: "", license_number: "", expiration_date: "" },
          ],
    });
    setIsEditModalOpen(true);
  };

  return (
      <Card
          key={index}
          sx={{ display: "flex", flexDirection: "column", padding: 2, mb: 2, ml: 3, mr: 3 }}
      >
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: "#89CFF0", width: 40, height: 40, fontSize: 18, mr: 2 }}>
            {inspector.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
          </Avatar>
          <Box flex={1}>
            <Box display={'flex'}>
              <Typography variant="h6">{inspector.name}</Typography>
              <IconButton onClick={handleToggleOpen} size="small">
                {isOpened ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Box display="flex" alignItems="center">
              <EmailIcon fontSize="small" sx={{ mr: 1, color: "gray" }} />
              <Typography variant="body2" color="textSecondary">
                {inspector.email}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <PhoneIcon fontSize="small" sx={{ mr: 1, color: "gray" }} />
              <Typography variant="body2" color="textSecondary">
                {inspector.phone_number}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <LocationOnIcon fontSize="small" sx={{ mr: 1, color: "gray" }} />
              <Typography variant="body2" color="textSecondary">
                {inspector.address}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Chip label="Active" sx={{ backgroundColor: "#E6FAE6", color: "#2E7D32", fontWeight: 600, mr: 2 }} />
            <IconButton size="small" onClick={handleEditClick}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleDeleteClick}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {isOpened && (
            <Box mt={2}>
              <Divider />
              <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
                Licenses & Certifications
              </Typography>
              {inspector.licenses.map((license, index) => (
                  <Box
                      display='flex'
                      justifyContent='space-between'
                      key={index}
                      sx={{
                        mt: 2,
                        p: 2,
                        border: "1px solid #E0E0E0",
                        borderRadius: "8px",
                        backgroundColor: "#F9F9F9",
                      }}
                  >
                    <Box display="flex" flexDirection={'column'}>
                      <Typography variant="body1" fontWeight="bold">
                        {license.license_type}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        License #{license.license_number}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Issued by State Fire Marshal
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection={'column'} alignItems="flex-end" justifyContent="space-between" mt={1}>
                      <Chip label="Active" sx={{ backgroundColor: "#E6FAE6", color: "#2E7D32", fontWeight: 600 }} />
                      <Box display="flex" alignItems="center">
                        <EventIcon fontSize="small" sx={{ mr: 1, color: "gray" }} />
                        <Typography variant="body2" color="textSecondary">
                          Expires {license.expiration_date ? dayjs(license.expiration_date).format("YYYY-MM-DD") : "N/A"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
              ))}
            </Box>
        )}

        <DeleteModal
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            inspectorName={inspector.name}
        />
        <InspectorModal
            isInspectorModalWindowOpened={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            inspectorData={inspectorData}
            onInspectorDataChange={setInspectorData}
            onInspectorModalWindowOpen={setIsEditModalOpen}
            inspectorId={inspector.id}
            isEditing
        />
      </Card>
  );
};

export default InspectorCard;
