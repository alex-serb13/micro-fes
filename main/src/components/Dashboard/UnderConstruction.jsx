import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

export function UnderConstruction() {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" py={32} display="block" width="100%">
      <Heading
        display="inline-block"
        as="h2"
        size="4xl"
        bgGradient="linear(to-r, blue.200, blue.400)"
        backgroundClip="text"
        lineHeight="inherit"
      >
        Coming soon...
      </Heading>
      <Text fontSize="18px" mt={6} mb={2}>
        Page under construnction
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you're looking for does not seem to exist yet
      </Text>

      <Button
        colorScheme="blue"
        bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
        color="white"
        variant="solid"
        onClick={() => navigate("/dashboard")}
      >
        Go to Home
      </Button>
    </Box>
  );
}
