import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import DrawerSlider from "./DrawerSlider";
import SingleMessageForm from "../Panel/messageForm/SingleMessageForm";
import MultiMessageForm from "./messageForm/MultiMessageForm";

import { loadUser } from "../../action/userAction";
import UserProfile from "./profile/UserProfile";
import DashBoard from "./dashboard/DashBoard";
import DeliveryReport from "./report/DeliveryReport";
import {useDispatch,useSelector} from "react-redux"

const Parent = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.loadUser
  );

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Box display="flex">
      <DrawerSlider onSelectItem={handleSelectItem} />

      <Box p={[2, 4, 6]} ml={40}>
        {/* 
        
       
        {selectedItem === "GET QR CODE" && }
        {selectedItem === "PlUGIN" &&  */}
        {selectedItem === "DASHBOARD" && <DashBoard />}
        {selectedItem === "PROFILE" && <UserProfile profile={user} />}
        {selectedItem === "SINGLE MESSAGES" && (
          <SingleMessageForm uuid={user?.uuid} id={user?._id} />
        )}
        {selectedItem === "MULTI MESSAGES" && (
          <MultiMessageForm uuid={user?.uuid} />
        )}
        {selectedItem === "DELIVERY REPORT" && <DeliveryReport id={user?._id} />}
        {/* 
        {selectedItem === "RESET QR" && */}
      </Box>
    </Box>
  );
};

export default Parent;
