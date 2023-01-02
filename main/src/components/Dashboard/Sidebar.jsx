import React from "react";
import { Box, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiCompass, FiSettings } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const LinkItems = [
  { name: "Home", icon: FiHome, link: "/dashboard" },
  { name: "Statistics", icon: FiTrendingUp, link: "/dashboard/statistics" },
  { name: "Clients", icon: FiCompass, link: "/dashboard/clients" },
  { name: "Settings", icon: FiSettings, link: "/dashboard/settings" },
];

export const Sidebar = () => {
  return (
    <Box
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      display={{ base: "block" }}
      w={{ base: "full" }}
      h={{ base: "calc(100vh - 70px)" }}
      py={"10"}
      pr={"2"}
    >
      {LinkItems.map(({ name, icon, link }) => (
        <NavItem key={name} icon={icon} link={link}>
          {name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, link, ...rest }) => {
  const { pathname } = useLocation();

  const isActive = pathname === link;
  const active = isActive
    ? {
        bg: useColorModeValue("blue.50", "blue.900"),
        color: useColorModeValue("black", "white"),
      }
    : {};

  return (
    <Link
      to={link}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mb="1"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("blue.50", "blue.900"),
          color: useColorModeValue("black", "white"),
        }}
        {...active}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};
