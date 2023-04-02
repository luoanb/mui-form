import { ComponentRef, useCallback, useMemo, useRef } from "react";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import { Export, FileExcel, TextBox } from "mdi-material-ui";
import { DropDown, MuiDataGrid } from "mui-form-hook";
import { defineComponent } from "ref-component";
import { UserList } from "../mock/user";
import * as XLSX from "xlsx";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Print from "@mui/icons-material/Print";
import MenuUp from "mdi-material-ui/MenuUp";
import DotsVertical from "mdi-material-ui/DotsVertical";
import { silentPrint } from "../utils/print";

const bookTypes: XLSX.BookType[] = [
  "xlsx",
  "xlsm",
  "xlsb",
  "xls",
  "xla",
  "biff8",
  "biff5",
  "biff2",
  "xlml",
  "ods",
  "fods",
  "csv",
  "txt",
  "sylk",
  "slk",
  "html",
  "dif",
  "rtf",
  "prn",
  "eth",
  "dbf",
  "numbers",
];

const exportMore = (keys: any[]) => {
  return (
    <DropDown
      target={({ open, handleOpen }) => (
        <Tooltip title="更多导出">
          <IconButton onClick={handleOpen}>
            <DotsVertical />
          </IconButton>
        </Tooltip>
      )}
      downContent={({ handleClose }) => (
        <Stack sx={{ p: 1 }}>
          {keys.map((option) => (
            <MenuItem
              key={option.key}
              onClick={() => {
                option.onClick();
                handleClose();
              }}
            >
              {option.key}
            </MenuItem>
          ))}
        </Stack>
      )}
    />
  );
};

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
  const dataref = useRef<ComponentRef<typeof DataGrid>>(null);
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
      XLSX.writeFile(wb, "导出文件." + bookType, { bookType: "csv" });
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
              <Tooltip title="打印">
                <IconButton
                  size="small"
                  onClick={() => {
                    if (dataref.current) {
                      // document
                      const printNode = dataref.current.cloneNode(
                        true
                      ) as HTMLElement;
                      printNode.style.height = 150 * userList.length + "px";
                      silentPrint(printNode?.outerHTML || "");
                    }
                  }}
                >
                  <Print />
                </IconButton>
              </Tooltip>
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
              {exportMore(
                bookTypes.map((key) => ({
                  key,
                  onClick: () => doExport(userList, key),
                }))
              )}
            </>
          }
        />
        <DataGrid
          ref={dataref}
          style={{ height: "100%" }}
          rowHeight={150}
          columns={columns1}
          rows={userList}
        />
      </Card>
    ),
  };
});
