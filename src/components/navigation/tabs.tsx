import { Tabs } from "@mantine/core";
import LecturesContent from "./nav-content/lectures-list";
import ArticlesContent from "./nav-content/articles-list";

export default function TabsUi({
  setMobileOpen,
}: {
  setMobileOpen?: (v: boolean) => void;
}) {
  return (
    <Tabs variant="outline" defaultValue="lectures">
      <Tabs.List>
        <Tabs.Tab value="lectures">Lectures</Tabs.Tab>
        <Tabs.Tab value="articles">Articles</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="lectures" pt="xs">
        <LecturesContent setMobileOpen={setMobileOpen} />
      </Tabs.Panel>
      <Tabs.Panel value="articles" pt="xs">
        <ArticlesContent setMobileOpen={setMobileOpen} />
      </Tabs.Panel>
    </Tabs>
  );
}
