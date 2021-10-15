/** @format */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Group, GroupMember } from "../../models/IceBreaker";
import questions from "../../questions/questions";
import { fetchGroupById } from "../../services/FinalProjectApiServices";
import SingularProfile from "../SingularProfile/SingularProfile";

interface RouteParams {
  id: string;
}
interface Props {
  groupMembers: GroupMember[];
}

function GroupMembersAnswers({ groupMembers }: Props) {
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    fetchGroupById(id).then((response) => {});
  }, [id]);

  return (
    <div className="GroupMembersAnswers">
      {groupMembers.map((eachMember) => (
        <SingularProfile key={eachMember.userUid} groupMember={eachMember} />
      ))}
    </div>
  );
}

export default GroupMembersAnswers;
