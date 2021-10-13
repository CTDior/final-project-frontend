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

  useEffect(() => {
    fetchGroupById(id).then((response) => {
      setGroup(response);
    });
    fetchAllGroupMembers(id).then((response) => {
      setGroupMembers(response);
    });
  }, [id]);
  console.log(groupMembers);

  // if (user && group._id) {
  return (
    <div className="GroupPage">
      <p> Welcome to the {group.name} Group Page</p>
      <MemberProfilesList groupMembers={groupMembers} />{" "}
      <ProfileForm group={group} />
    </div>

    // } else {
    // return (
    // <div className="GroupPage">
    //   <p>Please fill out this form to create your profile.</p>

    // </div>
  );
  // ););
  // }
};

export default GroupPage;
