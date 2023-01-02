import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  Link,
  useColorMode,
  Container,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  HStack,
  Avatar,
  VStack,
  MenuDivider,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FiChevronDown } from "react-icons/fi";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { mutate } from "swr";
import useStore from "store/store";

const clearCache = () => mutate(() => true, undefined, { revalidate: false });

export default function WithSubnavigation() {
  const navigate = useNavigate();
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const { isAuthenticated, signOut, toggleColor } = useStore();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"70px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
      >
        <Container
          maxW={{ base: "container.xl", md: "container.xl" }}
          alignItems="center"
          display="flex"
        >
          <Flex flex={{ base: 1 }} justify={{ base: "start" }}>
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              fontSize="md"
              as="b"
              color={useColorModeValue("gray.800", "white")}
            >
              <Link as={RouterLink} to={isAuthenticated ? "/dashboard" : "/"}>
                MICRO
              </Link>
            </Text>
          </Flex>

          {!isAuthenticated ? (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                onClick={() => {
                  navigate("/auth/signin");
                }}
              >
                Sign In
              </Button>
              <Button
                display={{ base: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                href={"#"}
                colorScheme={"green"}
                bg={"blue.400"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  navigate("/auth/signup");
                }}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  toggleColorMode();
                  toggleColor(colorMode === "light" ? "dark" : "light");
                }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          ) : (
            <Stack
              flex={{ base: 1 }}
              justify={"flex-end"}
              alignItems="center"
              direction={"row"}
              spacing={6}
            >
              <Link
                p={2}
                as={RouterLink}
                to={"/dashboard"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                Dashboard
              </Link>
              <Menu>
                <MenuButton
                  py={2}
                  // transition="all 0.3s"
                  // _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">Justina Clark</Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Billing</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      clearCache();
                      signOut();
                    }}
                  >
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
              <Button
                onClick={() => {
                  toggleColorMode();
                  toggleColor(colorMode === "light" ? "dark" : "light");
                }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          )}
        </Container>
      </Flex>
    </Box>
  );
}
