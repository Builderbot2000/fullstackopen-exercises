import Box from "@mui/material/Box";

const ErrorNotification = ({ message }: { message: string }) => {
  return (
    <div style={{ visibility: message === "" ? "hidden" : "visible" }}>
      <Box
        sx={{ m: 0.5, p: 0.5, pl: 3, borderRadius: 1, backgroundColor: "pink" }}
      >
        {message}
      </Box>
    </div>
  );
};

export default ErrorNotification;
