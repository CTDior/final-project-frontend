/** @format */

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Group, GroupMember } from "../../models/IceBreaker";
import {
  fetchAllGroupMembers,
  fetchGroupById,
} from "../../services/FinalProjectApiServices";
import MemberProfilesList from "../MemberProfilesList/MemberProfilesList";
import ProfileForm from "../ProfileForm/ProfileForm";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import "./GroupPage.css";
import questions from "../../questions/questions";

import GroupAnswers from "../GroupAnswers/GroupAnswers";
import React from "react";
import Admin from "../Admin/Admin";

interface RouteParams {
  id: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const GroupPage = () => {
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [group, setGroup] = useState<Group>({
    _id: "",
    name: "",
    adminUid: "",
    profileQuestions: [],
    liveQuestionId: null,
  });
  const { id } = useParams<RouteParams>();
  const { user } = useContext(AuthContext);

  useEffect(loadGroup, [id]);

  function loadGroup() {
    fetchGroupById(id).then((response) => {
      setGroup(response);
    });
    fetchAllGroupMembers(id).then((response) => {
      setGroupMembers(response);
    });
  }

  // getting the text of the questions to display at top of page
  // const memberAnswers = groupMember.answers;
  // console.log(memberAnswers);
  const questionIdAndText = group.profileQuestions.map((item) => {
    const container: any = {};
    container.question = questions.find(
      (eachQuestion) => eachQuestion._id === item
    );
    return container;
  });

  const currentUserInGroup: GroupMember | undefined = groupMembers.find(
    (groupMember) => {
      return user?.uid === groupMember.userUid;
    }
  );

  let isAdmin = false;
  if (group.adminUid === user?.uid) {
    isAdmin = true;
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (currentUserInGroup && group._id) {
    return (
      <div className="GroupPage">
        <p>
          {" "}
          Welcome to <b>{group.name}</b>!
        </p>
        <ol className="GroupPage__QuestionList">
          {questionIdAndText.map((eachQuestion) => (
            <li key={eachQuestion.question._id}>
              {eachQuestion.question.text}
            </li>
          ))}
        </ol>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Members" {...a11yProps(0)} />
              <Tab label="Answers" {...a11yProps(1)} />
              {isAdmin && <Tab label="Admin" {...a11yProps(2)} />}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <MemberProfilesList
              groupMembers={groupMembers}
              currentUserInGroup={currentUserInGroup}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GroupAnswers groupMembers={groupMembers} group={group} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Admin group={group} onUpdate={loadGroup} />
            {/* <Admin  groupMembers={groupMembers} group={group} /> */}
          </TabPanel>
        </Box>{" "}
      </div>
    );
  } else {
    return (
      <div className="GroupPage">
        <p className="pleaseFillOutForm">
          Please fill out this form to create your profile.
        </p>
        <ProfileForm group={group} onComplete={loadGroup} />
      </div>
    );
  }
};

export default GroupPage;
