/** @format */

import { responsiveFontSizes } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Group, GroupMember } from "../../models/IceBreaker";
import {
  fetchAllGroupMembers,
  fetchGroupById,
} from "../../services/FinalProjectApiServices";
import GroupMembersAnswers from "../GroupMembersAnswers.tsx/GroupMembersAnswers";
import ProfileForm from "../ProfileForm/ProfileForm";
import "./GroupPage.css";

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

  useEffect(() => {
    fetchGroupById(id).then((response) => {
      setGroup(response);
    });
    fetchAllGroupMembers(id).then((response) => {
      setGroupMembers(response);
    });
  }, [id]);
  console.log(groupMembers);
  return (
    <div className="GroupPage">
      <p> Welcome to the {group.name} Group Page</p>
      <GroupMembersAnswers />

      <p>Please fill out this form to create your profile.</p>
      <ProfileForm />
    </div>
  );
};

export default GroupPage;
