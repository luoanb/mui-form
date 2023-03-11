import { Avatar, CardContent, CardHeader, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import Card from "@mui/material/Card";
import navData from "./navData";
import NavSection from "./navSection";

export default function Nav() {
  const theme = useTheme();
  return (
    <div>
      <Card sx={{ margin: "12px 24px", background: theme.palette.grey[100] }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              张
            </Avatar>
          }
          title="张三"
        />
      </Card>
      <NavSection data={navData} />
    </div>
  );
}
