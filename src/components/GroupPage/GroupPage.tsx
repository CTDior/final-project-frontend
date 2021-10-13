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

<<<<<<< HEAD
      <p>Please fill out this form to create your profile.</p>
      <ProfileForm group={group} />
    </div>
  );
=======
  if (user && group._id) {
    return (
      <div className="GroupPage">
        <p> Welcome to the {group.name} Group Page</p>
        <GroupMembersAnswers />{" "}
      </div>
    );
  } else {
    return (
      <div className="GroupPage">
        <p>Please fill out this form to create your profile.</p>
        <ProfileForm />
      </div>
    );
  }
>>>>>>> 3099cee8466b7c62c2894fd605434b6a98cddbc8
};

export default GroupPage;
