/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Group } from "../../models/IceBreaker";
import { fetchGroupById } from "../../services/FinalProjectApiServices";
import GroupMembersAnswers from "../GroupMembersAnswers.tsx/GroupMembersAnswers";
import "./GroupPage.css";

interface RouteParams {
  id: string;
}

const GroupPage = () => {
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
  }, [id]);

  return (
    <div className="GroupPage">
      <p> Welcome to the {group.name} Group Page</p>
      <GroupMembersAnswers />
    </div>
  );
};

export default GroupPage;
