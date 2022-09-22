import { Navbar } from "@mantine/core";
import TabsUi from "../navigation/tabs";


export default function NavbarUi({opened}) {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
      style={{position: "sticky", top: 0, left: 0}}
    >
      <TabsUi />
    </Navbar>
  );
}
