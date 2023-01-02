import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Create new <br />
            <Text as={"span"} color={"blue.400"}>
              microfrontends
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Monetize your content by charging your most loyal readers and reward
            them loyalty points. Give back to your loyal readers by granting
            them access to your pre-releases and sneak-peaks.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              rounded={"full"}
              px={6}
              bg={"blue.400"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => navigate("/auth/signup")}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
