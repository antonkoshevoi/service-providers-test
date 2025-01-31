import { Box, CircularProgress, Typography } from '@mui/material';
import Header from "./components/Header/Header.tsx";
import InspectorCard from "./components/InspectorCard/InspectorCard.tsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store.ts";
import { fetchInspectors } from "./store/inspectors/inspectorSlice.ts";
import InspectorModal from "./components/InspectorModal/InspectorModal.tsx";

function App() {
  const [isInspectorModalWindowOpened, setIsInspectorModalWindowOpened] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { inspectors, loading, error } = useSelector((state: RootState) => state.inspector);

  useEffect(() => {
    dispatch(fetchInspectors());
  }, [dispatch]);

  const [inspectorData, setInspectorData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    licenses: [{ license_type: "", license_number: "", expiration_date: "" }]
  });

  return (
      <Box sx={{ width: '100%', padding: '0', maxWidth: '100%' }}>
        <Header onModalOpen={setIsInspectorModalWindowOpened} />

        {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <CircularProgress />
            </Box>
        )}

        {error && (
            <Typography color="error" sx={{ mt: 3, textAlign: 'center' }}>
              Failed to load inspectors. Please try again later.
            </Typography>
        )}

        {!loading && !error && inspectors.length === 0 && (
            <Typography variant="h6" sx={{ mt: 3, color: "gray", textAlign: 'center' }}>
              No inspectors available. Add a new inspector to get started!
            </Typography>
        )}

        {!loading && !error && (
            <Box sx={{ mt: 3, paddingBottom: 3 }}>
              {inspectors.map((inspector, index) => (
                  <InspectorCard key={index} inspector={inspector} index={index} />
              ))}
            </Box>
        )}

        <InspectorModal
            onInspectorDataChange={setInspectorData}
            inspectorData={inspectorData}
            isInspectorModalWindowOpened={isInspectorModalWindowOpened}
            onInspectorModalWindowOpen={setIsInspectorModalWindowOpened}
            onClose={() => setIsInspectorModalWindowOpened(false)}
        />
      </Box>
  );
}

export default App;
