import "./index.css";

// Material UI imports
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import Login from "./formctrl/Login";
import Signup from "./formctrl/Signup";

function App() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <div style={{ textAlign: "center" }}>
        <Paper elevation={8} style={{ width: 300, padding: "20px", borderRadius: 10 }}>
            {checked ? (
              <Chip
                label="Logar"
                variant="outlined"
                color="info"
              />
            ) : (
              <Chip
                label="Registrar"
                variant="outlined"
                color="info"
              />
            )}
            <br />

            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />

          {checked ? <Login /> : <Signup />}
        </Paper>
        </div>
    </Box>
  );
}

export default App;