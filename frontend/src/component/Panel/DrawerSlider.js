import React from "react";
import { Box, VStack, Text, HStack, Icon, useToast } from "@chakra-ui/react";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { FaPuzzlePiece } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

import { FaFileAlt } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, text, onClick }) => (
  <HStack spacing="2" align="left" onClick={onClick} cursor="pointer">
    <Icon as={icon} boxSize="24px" />
    <Text>{text}</Text>
  </HStack>
);

function DrawerSlider({ onSelectItem }) {
  const navigate = useNavigate();
  const toast = useToast();

  const logout = () => {
    axios
      .post("/api/logout")
      .then((response) => {
        console.log("Logout successful");

        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: { error },
          description: "An error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <Box
      bg="teal.700"
      w="250px"
      color="white"
      height="100vh"
      p="4"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
    >
      <VStack spacing="4" align="left">
        <Text fontSize="2xl" fontWeight="bold">
          TAMMANA SOFTWARE
        </Text>
        <VStack spacing="4" align="left">
          <SidebarItem
            icon={MdOutlineDashboardCustomize}
            text="DASHBOARD"
            onClick={() => onSelectItem("DASHBOARD")}
          />

          <SidebarItem
            icon={CgProfile}
            text="PROFILE"
            onClick={() => onSelectItem("PROFILE")}
          />
          <SidebarItem
            icon={MdOutlineQrCodeScanner}
            text="GET QR CODE"
            onClick={() => onSelectItem("GET QR CODE")}
          />
          <SidebarItem
            icon={FaPuzzlePiece}
            text="PlUGIN"
            onClick={() => onSelectItem("PlUGIN")}
          />
          <SidebarItem
            icon={AiOutlineMessage}
            text="SINGLE MESSAGES"
            onClick={() => onSelectItem("SINGLE MESSAGES")}
          />
          <SidebarItem
            icon={AiOutlineMessage}
            text="MULTI MESSAGES"
            onClick={() => onSelectItem("MULTI MESSAGES")}
          />
          <SidebarItem
            icon={FaFileAlt}
            text="DELIVERY REPORT"
            onClick={() => onSelectItem("DELIVERY REPORT")}
          />

          <SidebarItem
            icon={GrPowerReset}
            text="RESET QR"
            onClick={() => onSelectItem("RESET QR")}
          />
        </VStack>
        <Box position="absolute" bottom="10%">
          <SidebarItem
            icon={IoIosLogOut}
            text="LOGOUT"
            onClick={() => logout()}
          />
        </Box>
      </VStack>
    </Box>
  );
}

export default DrawerSlider;
