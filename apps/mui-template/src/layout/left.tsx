import { CardContent, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import { AsyncTree, Tree } from "mui-form-hook";

const treelist = [
  { name: "首页", id: "1", hasChildren: true },
  { name: "应用程序", id: "2" },
  { name: "分析", id: "3" },
  { name: "文件", id: "4" }
];

const listData = [
  { id: "1", name: "小明", parentId: "0", hasChildren: true },
  { id: "2", name: "小红", parentId: "0" }
];

let unid = 1;

export default function Left() {
  const theme = useTheme();
  return (
    <div>
      <Card sx={{ margin: "12px 24px", background: theme.palette.grey[100] }}>
        <CardContent>小李子</CardContent>
      </Card>
      <Tree listData={treelist} displayExpr="name" keyExpr="id" />
      <AsyncTree createChildren={async (parentId) => listData.map((item) => ({ ...item, parentId: parentId || item.parentId, id: unid++ }))} displayExpr="name" parentExpr="parentId" keyExpr="id" rootValue="0" />
    </div>
  );
}
