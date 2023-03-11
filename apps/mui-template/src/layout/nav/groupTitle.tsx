import Typography from "@mui/material/Typography";

export default function GroupTitle({ title }: { title: string }) {
  return (
    <Typography
      variant="body1"
      color="inherit"
      sx={(theme) => ({ margin: `${theme.spacing(1)} ${theme.spacing(3)}` })}
      component="div"
    >
      {title}
    </Typography>
  );
}
