import { Answer, Group, GroupMember } from "../../models/IceBreaker";
import "./LiveQuestion.css";
import questions from "../../questions/questions";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileQuestion from "../ProfileForm/ProfileQuestion";
import { updateGroupMember } from "../../services/FinalProjectApiServices";

interface Props {
  group: Group;
  groupMembers: GroupMember[];
  onUpdate: () => void;
}

function LiveQuestion({ group, groupMembers, onUpdate }: Props) {
  const { user } = useContext(AuthContext);

  //handle answer submit function
  function handleLiveAnswer(answerText: string) {
    //create answer object by taking answer text and current group liveQuestionId to build Answer object.
    const liveQuestionAnswer: Answer = {
      questionId: group.liveQuestionId!,
      answer: answerText,
    };

    //member being updated is member associated with current user. find() user group number.
    const currentUserInGroup: GroupMember | undefined = groupMembers.find(
      (groupMember) => {
        return user?.uid === groupMember.userUid;
      }
    );

    // copy and update group member with new liveQuestionAnswer. See Admin.tsx line 40
    //call service updateGroupMember
    const updatedGroupMember: GroupMember = {
      ...currentUserInGroup!,
      liveQuestionAnswer: liveQuestionAnswer,
    };
    updateGroupMember(updatedGroupMember).then(onUpdate);
  }

  return (
    <div className="LiveQuestion">
      <ProfileQuestion
        questionId={group.liveQuestionId!}
        onAnswer={handleLiveAnswer}
      />
    </div>
  );
}

export default LiveQuestion;
