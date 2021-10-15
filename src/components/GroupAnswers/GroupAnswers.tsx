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
  const questionArray = group.profileQuestions.map((item) => {
    const container: any = {};
    container.question = questions.find(
      (eachQuestion) => eachQuestion._id === item
    );
    return container;
  });

  const answerArray = questionArray.map((options) => {
    return options.question.options;
  });

  const answerCount = answerArray.map((item) => {
    const container: any = {};
    container.item = item;
    container.count = 0;
    return container;
  });
  console.log(answerCount);
  return (
    <div className="GroupAnswers">
      {group.profileQuestions}
      <ol className="GroupAnswers__QuestionList">
        {questionArray.map((eachQuestion) => (
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
