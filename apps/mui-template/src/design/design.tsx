import Grid from "@mui/material/Unstable_Grid2";
import { defineComponent } from "ref-component";
import CardHeader from "@mui/material/CardHeader";
import { useThemeContext } from ".";
import Box from "@mui/material/Box";
import { PropsWithChildren } from "react";
import { IconButton, IconButtonProps, styled, Typography } from "@mui/material";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import BedtimeIcon from "@mui/icons-material/Bedtime";
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
          <Title>主题模式</Title>
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
            <Grid
              xs={4}
              alignItems="center"
              justifyContent="center"
              sx={{ display: "flex" }}
            >
              <SimpleCard size={80}>
                <span>666</span>
              </SimpleCard>
            </Grid>
          </Grid>
        </Box>
      </>
    ),
  };
});
