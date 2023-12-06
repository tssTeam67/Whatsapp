import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../../../action/messageAction";
import axios from "axios";
import moment from "moment";

const DeliveryReport = ({ id }) => {
  console.log(id);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/get/messages/${id}`);
        console.log(response.data.messages);
        setData(response.data.messages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <Table variant="simple">
      <Thead bg="black">
        <Tr>
          <Th style={{ color: "white" }}>Date</Th>
          <Th style={{ color: "white" }}>Message</Th>
          <Th style={{ color: "white" }}>From</Th>
          <Th style={{ color: "white" }}>To</Th>
          <Th style={{ color: "white" }}>Attachment</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <Tr key={item._id} bg={index % 2 === 0 ? "gray.100" : "white"}>
              <Td>{moment(item.date).format("YYYY-MM-DD HH:mm:ss")}</Td>
              <Td>{item.message}</Td>
              <Td>{item.user.contact}</Td>
              <Td>{item.receiverNumber}</Td>
              {/* <Td>{item.</Td> */}
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={5}>No data available</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default DeliveryReport;
