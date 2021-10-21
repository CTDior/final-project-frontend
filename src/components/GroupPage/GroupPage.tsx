/** @format */

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
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
import LiveQuestion from "../LiveQuestion/LiveQuestion";

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

  const loadGroup = useCallback(
    function () {
      fetchGroupById(id).then((response) => {
        setGroup(response);
      });
      fetchAllGroupMembers(id).then((response) => {
        setGroupMembers(response);
      });
    },
    [id]
  );

  useEffect(loadGroup, [loadGroup]);

  // Refresh the page
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      loadGroup();
      count++;
      if (count >= 60) {
        // 60 ticks is five minutes
        stopInterval();
      }
    }, 5000);
    function stopInterval() {
      clearInterval(interval);
    }
    // By returning stopInterval, it will be called when we
    // leave this component.
    return stopInterval;
  }, [loadGroup]);

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

  // Check if the current user is the group admin,
  // if so, display the Admin tab
  let isAdmin = false;
  if (group.adminUid === user?.uid) {
    isAdmin = true;
  }

  // Check if the group live question id is null,
  // if so, do not show live tab
  let isLiveQuestion = false;
  if (group.liveQuestionId !== null) {
    isLiveQuestion = true;
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
          <Box
            className="hello"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Members" value={0} {...a11yProps(0)} />
              <Tab label="Answers" value={1} {...a11yProps(1)} />
              {isLiveQuestion && (
                <Tab label="Live Question" value={2} {...a11yProps(2)} />
              )}
              {isAdmin && <Tab label="Admin" value={3} {...a11yProps(3)} />}
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
            <LiveQuestion
              group={group}
              groupMembers={groupMembers}
              onUpdate={loadGroup}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
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
