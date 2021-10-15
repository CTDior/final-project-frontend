/** @format */
import questions from "../../questions/questions";
import { Group, GroupMember } from "../../models/IceBreaker";
import "./GroupAnswers.css";

interface Props {
  groupMembers: GroupMember[];
  group: Group;
}

const GroupAnswers = ({ groupMembers, group }: Props) => {
  console.log(groupMembers);
  const questionText = group.profileQuestions.map((item) => {
    const container: any = {};
    container.question = questions.find(
      (eachQuestion) => eachQuestion._id === item
    );

    return container;
  });

  return (
    <div className="GroupAnswers">
      {group.profileQuestions}
      <ol className="GroupAnswers__QuestionList">
        {questionText.map((eachQuestion) => (
          <li key={eachQuestion.question._id}>
            {console.log(eachQuestion)}
            {eachQuestion.question.text}
            {eachQuestion.question.options}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default GroupAnswers;
