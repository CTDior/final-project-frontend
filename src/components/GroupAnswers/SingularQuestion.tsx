/** @format */

import { Card } from "@mui/material";
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

  let answerBarWidth;
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

    return {
      name: eachAnswer,
      count: counter,
      answerBarWidth: Number(
        ((counter / groupMembers.length) * 100).toFixed(1)
      ),
    };
  });

  // //bar width?
  // let answerBarWidth = (strawberryVotes/totalVotes * 100).toFixed(1)
  // let eachAnswerStyles = {
  //   width: answerBarWidth + "%",
  //   height: 20 + "px",
  //   backgroundColor: "#fc5a8d",
  // };
  console.log(countArray);

  return (
    <Card className="SingularQuestion" variant="outlined">
      {question.text}
      {countArray.map((eachAnswer) => (
        <ul key={eachAnswer.name} style={{ listStyle: "none" }}>
          <li>
            {eachAnswer.name}:{" "}
            {((eachAnswer.count / groupMembers.length) * 100).toFixed(1)}%
          </li>
          <div
            className="eachAnswerStyles"
            style={{
              backgroundColor: "#2196F3",
              height: "20px",
              width: eachAnswer.answerBarWidth + "%",
            }}
          ></div>
        </ul>
      ))}
    </Card>
  );
};

export default SingularQuestion;
