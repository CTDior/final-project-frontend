import { Group, GroupMember, Question } from "../../models/IceBreaker";
import questions from "../../questions/questions";
import "./SingularQuestion.css";

interface Props {
  groupMembers: GroupMember[];
  questionId: string;
}

const SingularQuestion = ({ groupMembers, questionId }: Props) => {
  const question: Question | undefined = questions.find(
    (eachQuestion) => questionId === eachQuestion._id
  );
  if (!question) {
    return <div>Error: No such question Id.</div>;
  }
  const countArray = question.options.map((eachAnswer) => {
    let counter = 0;
    for (const groupMember of groupMembers) {
      for (const groupMemberAnswer of groupMember.answers) {
        if (
          eachAnswer === groupMemberAnswer.answer &&
          groupMemberAnswer.questionId === question._id
        ) {
          counter++;
        }
      }
    }

    return { name: eachAnswer, count: counter };
  });
  console.log(countArray);

  return (
    <div className="SingularQuestion">
      {question.text}
      {countArray.map((eachAnswer) => eachAnswer.name)}
    </div>
  );
};

export default SingularQuestion;
