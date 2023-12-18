import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Input,
  Textarea,
  useToast,
  Grid,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { SendMessage } from "../../../action/messageAction";
import { useDispatch } from "react-redux";
import { SendFile } from "../../../action/fileAction";
import Papa from "papaparse";

const SingleMessageForm = ({ uuid, id }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [number, setNumber] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [sendCounter, setSendCounter] = useState(0);
  const [data, setData] = useState();

  const [setValues] = useState([]);

  const timestamp = new Date().toISOString();
  const suid = uuidv4();

  const uniqueId = `${timestamp}_${suid}`;

  console.log(uniqueId);
  console.log(number);
  function onClick(emojiData, event) {
    setMessage(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
    setSelectedEmoji(emojiData.unified);
  }

  const handleSend = async (e) => {
    e.preventDefault();

    setSendCounter((prevCounter) => prevCounter + 1);

    try {
      if (sendCounter >= 150) {
        toast({
          title: "API Disabled",
          description: "API is disabled. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      const numbersArray = number.split(",");
      if (!message) {
        const formData = new FormData();
        formData.append("file", file);
        const phoneNumber = numbersArray
          .map((number) => `91${number}`)
          .join(",");
        formData.append("phone", phoneNumber);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axios.post(
          `https://messagesapi.co.in/chat/sendfile/${uuid}`,
          formData,
          config
        );

        console.log(JSON.stringify(response.data));

        toast({
          title: "File Sent",
          description: "Your file has been sent successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else if (!file) {
        const formData = new FormData();
        formData.append("id", uuid);
        const phoneNumber = numbersArray
          .map((number) => `91${number}`)
          .join(",");
        formData.append("phone", phoneNumber);
        formData.append("message", message);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        await axios.post(
          `https://messagesapi.co.in/chat/sendmessage`,
          formData,
          config
        );

        toast({
          title: "Message sent",
          description: "Your message has been sent successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      } else {
        const formData = new FormData();
        formData.append("file", file);
        const phoneNumber = numbersArray
          .map((number) => `91${number}`)
          .join(",");
        formData.append("phone", phoneNumber);
        formData.append("message", message);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axios.post(
          `https://messagesapi.co.in/chat/sendmessagefile/${uuid}`,
          formData,
          config
        );

        console.log(JSON.stringify(response.data));

        toast({
          title: "File Sent",
          description: "Your file has been sent successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      const phoneNumber = numbersArray.map((number) => `91${number}`).join(",");

      const messageData = {
        message,
        phoneNumber,
      };
      const response1 = await axios.post(
        `/api/store/message/${id}/${uniqueId}`,
        messageData
      );
      // const files={file}
      // const response2 = await axios.post(`/api/upload/${uniqueId}`, files);
     
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while sending the message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

   const handleFileChange = (event) => {
  //   const file = event.target.files[0];

  //   Papa.parse(file, {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: function (result) {
  //       const valuesArray = [];

  //       result.data.forEach((d) => {
  //         valuesArray.push(Object.values(d));
  //       });

  //       setData(result.data);

  //       setValues(valuesArray);
  //     },
  //   });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSendCounter(0);
    }, 2 * 60 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [sendCounter]);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <Box boxShadow="lg" p={6} rounded="md">
        <Flex direction="column" maxW="400px" mx="auto">
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Upload File:</FormLabel>
              <Input type="file" accept=".csv" onChange={handleFileChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Phone No.</FormLabel>

              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Upload File:</FormLabel>
              <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </FormControl>

            <HStack spacing={4}>
              <Button
                colorScheme="teal"
                onClick={handleSend}
                variant="solid"
                w="50%"
              >
                Send Now
              </Button>
              <Button colorScheme="blue" variant="solid" w="50%">
                Schedule
              </Button>
            </HStack>

            <Text fontSize="sm" color="gray.500">
              * Note: Make sure to enter a valid phone number.
            </Text>
          </VStack>
        </Flex>
      </Box>
      <Box>
        <EmojiPicker
          onEmojiClick={(emojiData, event) => onClick(emojiData, event)}
          autoFocusSearch={false}
          emojiStyle={EmojiStyle.NATIVE}
        />
      </Box>
    </Grid>
  );
};

export default SingleMessageForm;
