import { CardContent, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import navData from "./navData";
import NavSection from "./navSection";

export default function Nav() {
  const theme = useTheme();
  return (
    <div>
      <Card sx={{ margin: "12px 24px", background: theme.palette.grey[100] }}>
        <CardContent>小李子</CardContent>
      </Card>
      <NavSection data={navData} />
    </div>
  );
}
