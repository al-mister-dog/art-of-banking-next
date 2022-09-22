import { createStyles } from "@mantine/core";
import { getLecturesMap, getParts } from "../../../../possible-data";
import { Accordion, List, Text } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  listItem: {
    borderLeft: "1px solid gray",
    padding: "5px 0px 5px 20px",
    "&:hover": {
      backgroundColor: theme.colors.blue[1],
      borderLeft: "1px solid blue",
    },
  },
}));

export default function LecturesContent({
  setMobileOpen,
}: {
  setMobileOpen?: (v: boolean) => void;
}) {
  const { classes } = useStyles();
  const lectures = getLecturesMap();

  return (
    <Accordion variant="filled">
      {lectures.map((lecture) => {
        return (
          <Accordion.Item value={lecture.title} key={lecture.lectureId}>
            <Accordion.Control>
              <Link
                href={{
                  pathname: `/lectures/${lecture.url}`,
                  query: { id: lecture.lectureId },
                }}
              >
                {lecture.title}
              </Link>
            </Accordion.Control>
            <Accordion.Panel>
              <List listStyleType="none">
                {getParts(lecture.lectureId).map((part: any) => {
                  return (
                    <List.Item
                      className={classes.listItem}
                      key={part.partId}
                      onClick={() => {
                        if (setMobileOpen) {
                          setMobileOpen(false);
                        }
                      }}
                    >
                      <Text size="sm">
                        <Link
                          href={{
                            pathname: `/lectures/${lecture.url}/${part.url}`,
                            query: {
                              id: part.partId,
                              lectureId: lecture.lectureId,
                              keyTermsIds: part.keyTermsIds,
                            },
                          }}
                        >
                          {part.title}
                        </Link>
                      </Text>
                    </List.Item>
                  );
                })}
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
