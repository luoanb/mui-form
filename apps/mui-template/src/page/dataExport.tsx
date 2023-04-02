import { Box, Card, CardHeader, IconButton, Tooltip } from "@mui/material";
import { Export, FileExcel, TextBox } from "mdi-material-ui";
import { MuiDataGrid } from "mui-form-hook";
import { defineComponent } from "ref-component";
import { UserList } from "../mock/user";
import * as XLSX from "xlsx";
import { GridColumns } from "@mui/x-data-grid";
import { useCallback, useMemo } from "react";

const columns1: GridColumns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "名称", width: 200 },
  {
    field: "image",
    headerName: "头像",
    width: 150,
    renderCell: (props) => (
      <Box
        component="img"
        src={props.value}
        sx={(t) => ({
          boxShadow: t.shadows[8],
          borderRadius: "12px",
          width: "90%",
          height: "90%",
          margin: "5%",
        })}
      />
    ),
  },
  { field: "email", headerName: "邮箱", width: 200 },
  { field: "website", headerName: "website", width: 200 },
  { field: "address", headerName: "地址", width: 200 },
  { field: "bio", headerName: "简介", width: 200 },
];

export default defineComponent(() => {
  const userList = useMemo(() => UserList(35), []);
  /**
   * 数据导出
   */
  const doExport = useCallback(
    (userList: any[], bookType: XLSX.BookType = "xlsx") => {
      let ws = XLSX.utils.aoa_to_sheet(
        userList.map((item: any) => {
          return Object.keys(item)
            .filter((key) => Object.hasOwn(item, key))
            .map((key) => item[key]);
        })
      );
      XLSX.utils.sheet_add_aoa(ws, [Object.keys(userList[0])], {
        origin: "A1",
      });
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "页一");
      XLSX.writeFile(wb, "导出文件.csv", { bookType: "csv" });
    },
    []
  );
  return {
    element: (
      <Card sx={{ height: "100%", p: "18px", pt: 0 }}>
        <CardHeader
          title="数据导出"
          action={
            <>
              <Tooltip title="Xlsx导出">
                <IconButton
                  size="small"
                  onClick={() => doExport(userList, "xlsx")}
                >
                  <FileExcel />
                </IconButton>
              </Tooltip>
              <Tooltip title="Csv导出">
                <IconButton
                  size="small"
                  onClick={() => doExport(userList, "csv")}
                >
                  <TextBox />
                </IconButton>
              </Tooltip>
            </>
          }
        />
        <MuiDataGrid
          style={{ height: "100%" }}
          rowHeight={150}
          columns={columns1}
          rows={userList}
        />
      </Card>
    ),
  };
});
