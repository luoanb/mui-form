import { CardContent, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import { Tree } from "mui-form-hook";

const treelist = [
  { name: "首页", id: "1", hasChildren: true },
  { name: "应用程序", id: "2" },
  { name: "分析", id: "3" },
  { name: "文件", id: "4" }
];

export default function Left() {
  const theme = useTheme();
  return (
    <div>
      <Card sx={{ margin: "12px 24px", background: theme.palette.grey[100] }}>
        <CardContent>小李子</CardContent>
      </Card>
      <Tree listData={treelist} displayExpr="name" keyExpr="id" />
    </div>
  );
}
