import NavbarNew from "./NavbarNew";
import { Box } from "./Box";
import {useTheme } from "@nextui-org/react";
const Layout = ({ children }) => {

  const {theme} = useTheme();
  return (
    <>
      <Box
        css={{
          maxW: "100%",
        }}
      >
        <NavbarNew />
        {children}
      </Box>
    </>
  );
};

export default Layout;
