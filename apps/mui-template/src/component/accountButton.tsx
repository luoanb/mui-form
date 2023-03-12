import {
  alpha,
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import DropDown from "./dropDwon";

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
  },
];

export default function AccountButton() {
  return (
    <DropDown
      target={({ open, handleOpen }) => (
        <IconButton
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              "&:before": {
                zIndex: 1,
                content: "''",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.5),
              },
            }),
          }}
        >
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            张
          </Avatar>
        </IconButton>
      )}
      downContent={({ handleClose }) => (
        <>
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle2" noWrap>
              张三
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              luoanb@163.com
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: "dashed" }} />

          <Stack sx={{ p: 1 }}>
            {MENU_OPTIONS.map((option) => (
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            ))}
          </Stack>

          <Divider sx={{ borderStyle: "dashed" }} />

          <MenuItem onClick={handleClose} sx={{ m: 1 }}>
            Logout
          </MenuItem>
        </>
      )}
    />
  );
}
