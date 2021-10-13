import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Group } from "../../models/IceBreaker";
import questions from "../../questions/questions";
import { fetchGroupById } from "../../services/FinalProjectApiServices";

interface RouteParams {
  id: string;
}

function GroupMembersAnswers() {
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
    <div className="GroupMembersAnswers">
      <div>{group.profileQuestions[0]}</div>
    </div>
  );
}

export default GroupMembersAnswers;
