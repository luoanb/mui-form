import { CardContent, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import { Tree, Treee, Tree2, NewTree, TreeNodeProps, IterativeTree } from "mui-form-hook";
import TreeItem from "@mui/lab/TreeItem";
import { TreeView } from "@mui/lab";

const data: TreeNodeProps[] = [
  {
    name: "node1",
    children: [{ name: "node1.1" }, { name: "node1.2", children: [{ name: "node1.2.1" }, { name: "node1.2.2" }] }]
  },
  { name: "node2" },
  { name: "node3", children: [{ name: "node3.1" }, { name: "node3.2" }] }
];

const treeData: any[] = [
  {
    data: { id: 1, name: "Node 1" },
    children: [
      {
        data: { id: 2, name: "Node 1-1" }
      },
      {
        data: { id: 3, name: "Node 1-2" }
      }
    ]
  },
  {
    data: { id: 4, name: "Node 2" }
  }
];

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

const data2 = {
  value: "node1",
  id: "node1",
  children: [
    {
      id: "node1.1",
      value: "node1.1",
      children: [{ id: "node1.1.1", value: "node1.1.1" }]
    },
    {
      value: "node1.2",
      id: "node1.2"
      // children: [{ value: "node1.2.1" }, { value: "node1.2.2", children: [{ value: "node1.2.2.1" }, { value: "node1.2.2.2" }, { value: "node1.2.2.3" }, { value: "node1.2.2.4" }, { value: "node1.2.2.5" }] }]
    }
  ]
};
const data3 = [
  {
    value: "node1",
    id: "node1",
    children: [
      {
        id: "node1.1",
        value: "node1.1",
        children: [{ id: "node1.1.1", value: "node1.1.1" }]
      },
      {
        value: "node1.2",
        id: "node1.2"
      },
      {
        value: "node1.3",
        id: "node1.3"
      },
      {
        value: "node1.4",
        id: "node1.4"
      },
    ]
  }
];

let unid = 1;

export default function Left() {
  const theme = useTheme();
  return (
    <div>
      <Card sx={{ margin: "12px 24px", background: theme.palette.grey[100] }}>
        <CardContent>小李子</CardContent>
      </Card>
      {/* <Tree listData={data} displayExpr="name" keyExpr="name" childrenExpr="children" /> */}
      {/* <Treee tree={data2} /> */}
      <NewTree listData={data3} />
      {/* <IterativeTree data={data2} /> */}
      {/* <Tree2 treeData={data3} /> */}
      {/* <AsyncTree createChildren={async (parentId) => listData.map((item) => ({ ...item, parentId: parentId || item.parentId, id: unid++ }))} displayExpr="name" parentExpr="parentId" keyExpr="id" rootValue="0" /> */}
    </div>
  );
}
