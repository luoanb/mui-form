import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { defineComponent } from "ref-component";
import CardHeader from "@mui/material/CardHeader";
import { getDefaultThemeOptions, useThemeContext } from "mui-layout-component";
import Box from "@mui/material/Box";
import { PropsWithChildren } from "react";
import { IconButton, IconButtonProps, styled, Typography } from "@mui/material";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import themeOptions from "./purple/ThemeOptions";
import { PureLightTheme } from "./PureLightTheme";
const SimpleCard = ({
  children,
  size = 60,
  ...props
}: PropsWithChildren<
  { size?: number } & Omit<IconButtonProps, "size" | "sx">
>) => {
  return (
    <IconButton
      {...props}
      sx={(t) => ({
        borderRadius: t.spacing(2),
        border: `1px ${t.palette.grey[300]} solid`,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: size,
        height: size,
      })}
    >
      {children}
    </IconButton>
  );
};

const Title = styled(Typography)(
  ({ theme: t }) => `
color: ${t.palette.text.secondary};
padding: 8px 4px;
`
);

export const Design = defineComponent(() => {
  const { setThemeByOptions } = useThemeContext();
  // debugger
  return {
    element: (
      <>
        <CardHeader title="主题设计" sx={{ width: 300 }} />
        <Box sx={{ p: 1 }}>
          <Title>新主题</Title>
          <Grid container spacing={2}>
            <Grid
              xs={4}
              alignItems="center"
              justifyContent="center"
              sx={{ display: "flex" }}
            >
              <SimpleCard
                size={80}
                onClick={() => setThemeByOptions(PureLightTheme)}
              >
                <Brightness5Icon />
              </SimpleCard>
            </Grid>
          </Grid>
          <Title>正常</Title>
          <Grid container spacing={2}>
            <Grid
              xs={4}
              alignItems="center"
              justifyContent="center"
              sx={{ display: "flex" }}
            >
              <SimpleCard
                size={80}
                onClick={() => setThemeByOptions(getDefaultThemeOptions())}
              >
                <Brightness5Icon />
              </SimpleCard>
            </Grid>
          </Grid>
          <Title>默认</Title>
          <Grid container spacing={2}>
            <Grid
              xs={4}
              alignItems="center"
              justifyContent="center"
              sx={{ display: "flex" }}
            >
              <SimpleCard
                size={80}
                onClick={() =>
                  setThemeByOptions({
                    palette: { mode: "light" },
                  })
                }
              >
                <Brightness5Icon />
              </SimpleCard>
            </Grid>
            <Grid
              xs={4}
              alignItems="center"
              justifyContent="center"
              sx={{ display: "flex" }}
            >
              <SimpleCard
                size={80}
                onClick={() =>
                  setThemeByOptions({
                    palette: { mode: "dark" },
                  })
                }
              >
                <BedtimeIcon />
              </SimpleCard>
            </Grid>
          </Grid>
          <Title>紫意</Title>
          <Grid container spacing={2}>
            <Grid
              xs={4}
              alignItems="center"
              justifyContent="center"
              sx={{ display: "flex" }}
            >
              <SimpleCard
                size={80}
                onClick={() =>
                  setThemeByOptions(
                    themeOptions({
                      themeColor: "primary",
                      mode: "light",
                      contentWidth: "full",
                    })
                  )
                }
              >
                <Brightness5Icon />
              </SimpleCard>
            </Grid>
            <Grid
              xs={4}
              alignItems="center"
              justifyContent="center"
              sx={{ display: "flex" }}
            >
              <SimpleCard
                size={80}
                onClick={() =>
                  setThemeByOptions(
                    themeOptions({
                      themeColor: "primary",
                      mode: "dark",
                      contentWidth: "full",
                    })
                  )
                }
              >
                <BedtimeIcon />
              </SimpleCard>
            </Grid>
          </Grid>
        </Box>
      </>
    ),
  };
});
