import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useStore from "store/store";
import useSWRMutation from "swr/mutation";

const fetcher = async () => {
  await fetch("https://63b291865e490925c51bcf91.mockapi.io/api/signin", {
    method: "POST",
    body: {},
  });
};

export default function SimpleCard() {
  const navigate = useNavigate();
  const { signIn } = useStore();

  const { isMutating, trigger } = useSWRMutation("signin", fetcher, {
    onSuccess: () => {
      signIn();
      navigate("/dashboard");
    },
  });

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={20} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                color={"white"}
                bg={"blue.400"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  trigger("");
                }}
                isLoading={isMutating}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
