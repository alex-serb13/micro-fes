import { Container, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Dashboard() {
  return (
    <Container maxW={"7xl"}>
      <Grid gridTemplateColumns={"230px 1fr"}>
        <GridItem>
          <Sidebar />
        </GridItem>
        <GridItem>
          <Flex h="100%" w="100%" pl={10}>
            <Outlet />
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
