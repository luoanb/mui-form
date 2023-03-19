import React, { useContext } from "react";
import PopupState, { bindHover, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { MuiTree } from "mui-form-hook";
import { Paper, Tooltip, Typography } from "@mui/material";
import { customLabelText } from ".";
import { Link } from "../../component/nextLink";
import { DashboardState, GroupTitle } from "mui-layout-component";
const Popper = React.lazy(() => import("@mui/material/Popper"));

interface InsideItemProps {
  item: any;
  keyExpr?: string;
  childrenExpr?: string;
  displayExpr?: string;
}
export function InsideItem({
  item,
  keyExpr = "id",
  displayExpr = "name",
  childrenExpr = "children",
}: InsideItemProps) {
  const { selectid } = useContext(DashboardState);

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <Tooltip
          title={item[childrenExpr] ? null : item[displayExpr]}
          placement="right"
        >
          <div>
            <IconButton
              LinkComponent={Link}
              href={item["path"]}
              size="large"
              sx={{
                m: "3px 12px",
                backgroundColor: selectid === item[keyExpr] ? "#ccc" : null,
              }}
              {...bindHover(popupState)}
            >
              {item.icon}
            </IconButton>

            {item[childrenExpr] ? (
              <Popper
                {...bindPopper(popupState)}
                transition
                placement="right-start"
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{ p: "12px", width: 240 }}>
                      <GroupTitle title={item[displayExpr]} />
                      <MuiTree
                        treeViewProps={{ selected: [selectid] }}
                        customLabelText={customLabelText}
                        data={item[childrenExpr]}
                        keyExpr={keyExpr}
                        displayExpr={displayExpr}
                        childrenExpr={childrenExpr}
                      />
                    </Paper>
                  </Fade>
                )}
              </Popper>
            ) : null}
          </div>
        </Tooltip>
      )}
    </PopupState>
  );
}
