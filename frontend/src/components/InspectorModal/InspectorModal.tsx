import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createInspector, updateInspector } from "../../store/inspectors/inspectorSlice.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";
import {Inspector} from "../../types/Inspector/inspector.type.ts";

type Properties = {
  isInspectorModalWindowOpened: boolean;
  onClose: () => void;
  inspectorData: Inspector;
  onInspectorDataChange: React.Dispatch<React.SetStateAction<Inspector>>;
  onInspectorModalWindowOpen: (isOpened: boolean) => void;
  isEditing?: boolean;
  inspectorId?: string;
};

const InspectorModal: React.FC<Properties> = ({
                                                isInspectorModalWindowOpened,
                                                onClose,
                                                inspectorData,
                                                onInspectorDataChange,
                                                onInspectorModalWindowOpen,
                                                isEditing = false,
                                                inspectorId
                                              }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: ""
  });

  const validateFields = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", phone_number: "", address: "" };

    if (!inspectorData.name.trim() || inspectorData.name.trim().split(" ").length !== 2) {
      newErrors.name = "Full name (2 words) is required.";
      isValid = false;
    }
    if (!inspectorData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    }
    if (!inspectorData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required.";
      isValid = false;
    }
    if (!inspectorData.address.trim()) {
      newErrors.address = "Address is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLicenseChange = (index: number, field: string, value: string) => {
    onInspectorDataChange((prevData) => {
      const newLicenses = prevData.licenses.map((license, i) =>
          i === index ? { ...license, [field]: field === "expiration_date" ? dayjs(value) : value } : license
      );
      return { ...prevData, licenses: newLicenses } as Inspector;
    });
  };

  const handleAddLicense = () => {
    onInspectorDataChange((prevData: Inspector) => ({
      ...prevData,
      licenses: [...prevData.licenses, { license_type: "", license_number: "", expiration_date: "" }]
    })) as unknown as Inspector;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    onInspectorDataChange((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleAddInspector = () => {
    if (!validateFields()) return;

    const filteredLicenses = inspectorData.licenses.filter(
        (license) => license.license_type && license.license_number
    );

    const dataToSend = { ...inspectorData, licenses: filteredLicenses };

    if (!isEditing) {
      dispatch(createInspector(dataToSend));
    } else {
      dispatch(updateInspector({ updatedData: dataToSend, id: inspectorId as string }));
    }

    onInspectorModalWindowOpen(false);
    onInspectorDataChange({ name: "", email: "", phone_number: "", address: "", licenses: [] });
  };

  const handleRemoveLicense = (index: number) => {
    onInspectorDataChange((prevData) => ({
      ...prevData,
      licenses: prevData.licenses.filter((_, i) => i !== index)
    }));
  };

  return (
      <Dialog open={isInspectorModalWindowOpened} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? "Edit Inspector" : "Add New Inspector"}</DialogTitle>
        <DialogContent>
          <TextField
              label="Name"
              fullWidth
              margin="dense"
              value={inspectorData.name}
              onChange={(e) => handleChange(e, "name")}
              error={!!errors.name}
              helperText={errors.name}
          />

          <TextField
              label="Email"
              fullWidth
              margin="dense"
              value={inspectorData.email}
              onChange={(e) => handleChange(e, "email")}
              error={!!errors.email}
              helperText={errors.email}
          />

          <TextField
              label="Phone"
              fullWidth
              margin="dense"
              value={inspectorData.phone_number}
              onChange={(e) => handleChange(e, "phone_number")}
              error={!!errors.phone_number}
              helperText={errors.phone_number}
          />

          <TextField
              label="Address"
              fullWidth
              margin="dense"
              value={inspectorData.address}
              onChange={(e) => handleChange(e, "address")}
              error={!!errors.address}
              helperText={errors.address}
          />

          <Box mt={2}>
            <Typography fontWeight="bold">Licenses</Typography>
            {inspectorData.licenses.map((license, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1} mt={1}>
                  <Select
                      value={license.license_type}
                      onChange={(e) => handleLicenseChange(index, "license_type", e.target.value)}
                      displayEmpty
                      fullWidth
                  >
                    <MenuItem value="" disabled>Select type...</MenuItem>
                    <MenuItem value="Type A">Type A</MenuItem>
                    <MenuItem value="Type B">Type B</MenuItem>
                    <MenuItem value="Type C">Type C</MenuItem>
                  </Select>

                  <TextField
                      placeholder="License Number"
                      value={license.license_number}
                      onChange={(e) => handleLicenseChange(index, "license_number", e.target.value)}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Expiry Date"
                        value={license.expiration_date ? dayjs(license.expiration_date) : null}
                        onChange={(newValue) => handleLicenseChange(index, "expiration_date", newValue as unknown as string)}
                        shouldDisableDate={(date) => dayjs(date).isBefore(dayjs(), "day")}
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>

                  {index > 0 && (
                      <IconButton onClick={() => handleRemoveLicense(index)} color="error">
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                  )}
                </Box>
            ))}

            <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddLicense} sx={{ mt: 1 }}>
              Add License
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => onInspectorModalWindowOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddInspector}>
            {isEditing ? "Save Changes" : "Add Inspector"}
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default InspectorModal;
