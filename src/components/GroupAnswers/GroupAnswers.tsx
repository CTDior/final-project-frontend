/** @format */
import questions from "../../questions/questions";
import { Group, GroupMember } from "../../models/IceBreaker";
import "./GroupAnswers.css";
import SingularQuestion from "./SingularQuestion";

interface Props {
  groupMembers: GroupMember[];
  group: Group;
}

const GroupAnswers = ({ groupMembers, group }: Props) => {
  return (
    <div className="GroupAnswers">
      {group.profileQuestions.map((questionId) => (
        <SingularQuestion
          key={questionId}
          groupMembers={groupMembers}
          questionId={questionId}
        />
      ))}
    </div>
  );
};

export default GroupAnswers;
