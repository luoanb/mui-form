import { Box, Card, CardHeader, IconButton } from "@mui/material";
import { Export } from "mdi-material-ui";
import { MuiDataGrid } from "mui-form-hook";
import { defineComponent } from "ref-component";
import { UserList } from "../mock/user";
import * as XLSX from "xlsx";

export default defineComponent(() => {
  const userList = UserList(35);
  const columns = Object.keys(userList[0]).map((key) => ({
    field: key,
    headerName: key,
  }));

  return {
    element: (
      <Card sx={{ height: "100%", p: "18px", pt: 0 }}>
        <CardHeader
          title="数据导出"
          action={
            <IconButton
              size="small"
              onClick={() => {
                let ws = XLSX.utils.aoa_to_sheet(
                  userList.map((item: any) => {
                    return Object.keys(item)
                      .filter((key) => Object.hasOwn(item, key))
                      .map((key) => item[key]);
                  })
                );
                let wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "页一");
                XLSX.writeFile(wb, "导出文件.xlsx");
              }}
            >
              <Export />
            </IconButton>
          }
        />
        <MuiDataGrid
          style={{ height: "100%" }}
          columns={columns}
          rows={userList}
        />
      </Card>
    ),
  };
});
