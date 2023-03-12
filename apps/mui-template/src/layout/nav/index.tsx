import { Avatar, CardContent, CardHeader, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import Card from "@mui/material/Card";
import navData from "./navData";
import NavSection from "./navSection";
import GroupTitle from "./groupTitle";

export default function Nav() {
  const theme = useTheme();
  return (
    <div>
      <Card sx={{ margin: "12px 24px", background: theme.palette.grey[300] }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              张
            </Avatar>
          }
          title="张三"
        />
      </Card>
      <GroupTitle title="基本的" />
      <NavSection data={navData} />
      <GroupTitle title="商务" />
      <NavSection data={navData} />
    </div>
  );
}
