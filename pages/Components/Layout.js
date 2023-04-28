import NavbarNew from "./NavbarNew";
import { Box } from "./Box";

const Layout = ({ children }) => {
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
