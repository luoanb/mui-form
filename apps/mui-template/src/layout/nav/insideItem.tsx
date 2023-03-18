import Popper from "@mui/material/Popper";
import PopupState, { bindHover, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { MuiTree } from "mui-form-hook";
import { Paper } from "@mui/material";
import { customLabelText } from ".";
import { Link } from "../../component/nextLink";

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
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <IconButton
            LinkComponent={Link}
            href={item["path"]}
            size="large"
            sx={{ m: "3px 12px" }}
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
                    <MuiTree
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
      )}
    </PopupState>
  );
}
