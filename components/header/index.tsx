import {
  Header as Head,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";

type HeaderType = {
  opened: boolean;
  setOpened: (o: any) => any;
};

export default function Header(props: HeaderType) {
  const { opened, setOpened } = props;
  const theme = useMantineTheme();

  return (
    <Head height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o: boolean) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text>Application Head</Text>
      </div>
    </Head>
  );
}