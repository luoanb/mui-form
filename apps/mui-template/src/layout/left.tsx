import { CardContent, useTheme } from "@mui/material";
import Card from "@mui/material/Card";

export default function Left() {
  const theme = useTheme();
  return (
    <div>
      <Card sx={{ margin: "12px 24px", background: theme.palette.grey[100] }}>
        <CardContent>小李子</CardContent>
      </Card>
    </div>
  );
}
