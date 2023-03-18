import Popper from "@mui/material/Popper";
import PopupState, { bindHover, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { MuiTree } from "mui-form-hook";
import { Paper } from "@mui/material";

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
            size="large"
            sx={{ m: "3px 12px" }}
            {...bindHover(popupState)}
          >
            {item.icon}
          </IconButton>
          <Popper {...bindPopper(popupState)} transition placement="bottom-end">
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  {item[childrenExpr] ? (
                    <MuiTree
                      data={item[childrenExpr]}
                      keyExpr={keyExpr}
                      displayExpr={displayExpr}
                      childrenExpr={childrenExpr}
                    />
                  ) : null}
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
