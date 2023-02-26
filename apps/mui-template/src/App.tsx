import Nav from "./layout/nav";
import Main from "./layout/main";
import Left from "./layout/left";
import Box from "@mui/material/Box";

function App() {
  return (
    <Box className="App" sx={{ flexGrow: 1 }}>
      <Nav />
      <Main leftComponent={<Left />}>内容</Main>
    </Box>
  );
}

export default App;
