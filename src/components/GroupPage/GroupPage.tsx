/** @format */

import { responsiveFontSizes } from "@mui/material";
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

interface RouteParams {
  id: string;
}

const GroupPage = () => {
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [group, setGroup] = useState<Group>({
    _id: "",
    name: "",
    adminUid: "",
    profileQuestions: [],
  });
  const { id } = useParams<RouteParams>();
  const { user } = useContext(AuthContext);

  useEffect(loadGroup, [id]);
  console.log(group);

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
  console.log(questionIdAndText);

  const isUserInGroup = groupMembers.some((groupMember) => {
    groupMember.groupId;
  });

  if (isUserInGroup && group._id) {
    return (
      <div className="GroupPage">
        <p>
          {" "}
          Welcome to the <b>{group.name}</b> Group Page
        </p>
        <ol>
          {questionIdAndText.map((eachQuestion) => (
            <li>{eachQuestion.question.text}</li>
          ))}
        </ol>
        <MemberProfilesList groupMembers={groupMembers} />{" "}
      </div>
    );
  } else {
    return (
      <div className="GroupPage">
        <p>Please fill out this form to create your profile.</p>
        <ProfileForm group={group} onComplete={loadGroup} />
      </div>
    );
  }
};

export default GroupPage;
