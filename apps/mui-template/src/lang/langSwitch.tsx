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
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { resources } from ".";
import DropDown from "../component/dropDwon";

const MENU_OPTIONS = resources;

export default function LangSwitch() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const currentImg: any = useMemo(
    () => MENU_OPTIONS[currentLanguage]?.icon,
    [currentLanguage]
  );

  return (
    <DropDown
      target={({ open, handleOpen }) => (
        <IconButton
          onClick={handleOpen}
          sx={(theme) => ({
            p: 0,
            width: 40,
            height: 40,
            bgcolor: (theme) => alpha(theme.palette.grey[100], 0.1),
            transition: "all .3s",
            ":hover": { background: alpha(theme.palette.grey[300], 0.5) },
            ...(open && {
              "&:before": {
                zIndex: 1,
                content: "''",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[100], 0.1),
              },
            }),
          })}
        >
          <Avatar sx={{ background: "transparent" }} aria-label="recipe">
            <img
              src={currentImg}
              width={24}
              height={20}
              style={{ borderRadius: 3 }}
              alt="Avatar"
            />
          </Avatar>
        </IconButton>
      )}
      downContent={({ handleClose }) => (
        <>
          <Stack sx={{ p: 1 }}>
            {Object.keys(MENU_OPTIONS).map((key) => (
              <MenuItem
                key={key}
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    i18n.changeLanguage(key);
                  }, 300);
                }}
              >
                <Avatar
                  sx={{ width: 28, height: 28 }}
                  src={MENU_OPTIONS[key].icon as any}
                />
                <Typography sx={(theme) => ({ ml: theme.spacing(2) })}>
                  {t(`lang.${key}`)}
                </Typography>
              </MenuItem>
            ))}
          </Stack>
        </>
      )}
    />
  );
}
