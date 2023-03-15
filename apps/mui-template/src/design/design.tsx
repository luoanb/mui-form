import Grid from "@mui/material/Unstable_Grid2";
import { defineComponent } from "ref-component";
import CardHeader from "@mui/material/CardHeader";
import { useThemeContext } from ".";
import Box from "@mui/material/Box";
import { PropsWithChildren } from "react";
import { IconButton } from "@mui/material";

const SimpleCard = ({
  children,
  size = 60,
}: PropsWithChildren<{ size?: number }>) => {
  return (
    <IconButton
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

export const Design = defineComponent(() => {
  const { theme } = useThemeContext();
  // debugger
  return {
    element: (
      <>
        <CardHeader title="主题设计" sx={{ width: 270 }} />
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid xs={6} alignItems="center" justifyContent="center" container>
            <SimpleCard size={80}>
              <span>666</span>
            </SimpleCard>
          </Grid>
          <Grid xs={6} alignItems="center" justifyContent="center" container>
            <SimpleCard size={80}>
              <span>666</span>
            </SimpleCard>
          </Grid>
          <Grid xs={6} alignItems="center" justifyContent="center" container>
            <SimpleCard size={80}>
              <span>666</span>
            </SimpleCard>
          </Grid>
          
          
        </Grid>
      </>
    ),
  };
});
