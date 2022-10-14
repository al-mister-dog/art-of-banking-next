import { keyTerms } from "../../../config/normalized-data/key-terms";
import {
  Button,
  Text,
  useMantineTheme,
  createStyles,
  Title,
} from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  title: {
    padding: 16,
    marginBottom: 0,
    display: "inline-block",
    background: theme.colors.red[0],
    borderTop: `1px solid ${theme.colors.red[1]}`,
    borderRight: `1px solid ${theme.colors.red[1]}`,
    borderTopRightRadius: 5,
  },
  card: {
    padding: 16,
    background: theme.colors.red[0],
  },
  desktopWidth: {
    width: "65%",
  },
  button: {
    fontSize: "1.2rem",
    letterSpacing: "1px",
    margin: "10px",
    "&:focus": {
      background: theme.colors.violet,
      color: "white",
    },
  },
}));

export default function KeyTerms({ ids }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [selectedTerm, setSelectedTerm] = useState({
    title: keyTerms[ids[0]].title,
    definition: keyTerms[ids[0]].definition,
  });

  const keyTermsArray = ids.map((kt) => ({
    key: kt,
    title: keyTerms[kt].title,
    definition: keyTerms[kt].definition,
  }));

  return (
    <>
      <div style={{ backgroundColor: theme.colors.violet[0] }}>
        <Title
          className={classes.title}
          order={2}
          style={{
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          Key Terms
        </Title>
      </div>

      <div style={{ padding: "25px" }}>
        {keyTermsArray.map((keyTerm) => (
          <Button
            key={keyTerm.key}
            color="violet"
            variant="outline"
            radius="xs"
            className={classes.button}
            onClick={() =>
              setSelectedTerm({
                title: keyTerm.title,
                definition: keyTerm.definition,
              })
            }
          >
            {keyTerm.title}
          </Button>
        ))}
      </div>

      <div style={{ padding: "0px 50px" }}>
        <Title order={2}>{selectedTerm.title}</Title>
        <Text>{selectedTerm.definition}</Text>
      </div>
    </>
  );
}
