import { Answer, Group, GroupMember } from "../../models/IceBreaker";
import "./LiveQuestion.css";
import questions from "../../questions/questions";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileQuestion from "../ProfileForm/ProfileQuestion";

interface Props {
  group: Group;
  groupMembers: GroupMember[];
}

function LiveQuestion({ group, groupMembers }: Props) {
  const { user } = useContext(AuthContext);

  //handle answer submit function
  function handleAnswer(answerText: string) {
    //create answer object by taking answer text and current group liveQuestionId to build Answer object.
    //member being updated is member associated with current user. find() user group number.
    // copy and update group member with new liveQuestionAnswer. See Admin.tsx line 40
    //call service updateGroupMember
    //use on update refresh. See Admin.tsx line 47
  }
  return (
    <div className="LiveQuestion">
      <ProfileQuestion
        questionId={group.liveQuestionId!}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default LiveQuestion;
