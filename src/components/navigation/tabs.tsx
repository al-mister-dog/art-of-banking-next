import { Tabs } from "@mantine/core";
import LecturesContent from "./nav-content/lectures-beta";

export default function TabsUi({
  setMobileOpen,
}: {
  setMobileOpen?: (v: boolean) => void;
}) {
  return (
    <Tabs variant="outline" defaultValue="lectures">
      <Tabs.List>
        <Tabs.Tab style={{fontSize: "0.8rem"}}value="lectures">Lectures</Tabs.Tab>
        <Tabs.Tab style={{fontSize: "0.8rem"}}value="articles">Articles</Tabs.Tab>
        {/* <Tabs.Tab style={{fontSize: "0.8rem"}}value="settings">Settings</Tabs.Tab> */}
      </Tabs.List>

      <Tabs.Panel value="lectures" pt="xs">
        <LecturesContent setMobileOpen={setMobileOpen} />
      </Tabs.Panel>

      <Tabs.Panel value="articles" pt="xs">
        Articles tab content
      </Tabs.Panel>

      {/* <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel> */}
    </Tabs>
  );
}
