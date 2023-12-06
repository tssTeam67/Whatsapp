import { Box, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import img from "../images/tss.jpeg";

const Home = () => {
  return (
    <Box
      bgImage="url(https://www.avanse.com/blogs/images/28feb-blog-2023.jpg)"
      bgSize="cover"
      bgPosition="center"
      h="100vh"
      position="relative"
    
    >
      <Flex
        p="6"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bg="black"
        color="white"
      >
        <Box>
          {" "}
          <Image src={img} alt="Logo" marginRight="40" w="100px" h="auto" />
        </Box>
        <Box marginLeft="5rem">
          {" "}
          <Flex>
            <Link href="#" marginRight="10">
              Home
            </Link>
            <Link href="#" marginRight="10">
              About Us
            </Link>
            <Link href="#" marginRight="10">
              Contact Us
            </Link>
            <Link href="/signup" marginRight="10">
              Account
            </Link>
          </Flex>
        </Box>
      </Flex>

      <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh" 
      fontSize="larger"
      fontWeight="100"
    >
      <p style={{ textAlign: "center" }}>BEST IS ... WHAT WE PROVIDES ...</p>
    </Box>
    </Box>
  );
};

export default Home;
