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
          sx={{
            p: 0,
            width: 40,
            height: 40,
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
          <Avatar
            src={currentImg}
            sx={{ width: 30, height: 30 }}
            aria-label="recipe"
          ></Avatar>
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
