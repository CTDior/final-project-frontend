/** @format */

import { Card } from "@mui/material";
import { GroupMember, Question } from "../../models/IceBreaker";
import questions from "../../questions/questions";
import "./SingularQuestion.css";

interface Props {
  groupMembers: GroupMember[];
  questionId: string;
  isLiveQuestion: boolean;
}

const SingularQuestion = ({
  groupMembers,
  questionId,
  isLiveQuestion,
}: Props) => {
  const question: Question | undefined = questions.find(
    (eachQuestion) => questionId === eachQuestion._id
  );
  if (!question) {
    return <div>Error: No such question Id.</div>;
  }
  let answerCount = 0;
  const countArray = question.options.map((eachAnswer) => {
    let counter = 0;
    const memberNames: string[] = [];
    for (const groupMember of groupMembers) {
      if (isLiveQuestion) {
        if (
          eachAnswer === groupMember.liveQuestionAnswer?.answer &&
          groupMember.liveQuestionAnswer.questionId === question._id
        ) {
          counter++;
          memberNames.push(groupMember.memberName);
          answerCount++;
        }
      } else {
        for (const groupMemberAnswer of groupMember.answers) {
          if (
            eachAnswer === groupMemberAnswer.answer &&
            groupMemberAnswer.questionId === question._id
          ) {
            counter++;
            memberNames.push(groupMember.memberName);
            answerCount++;
          }
        }
      }
    }

    return {
      name: eachAnswer,
      count: counter,
      memberNames: memberNames,
    };
  });

  // //bar width?
  // let answerBarWidth = (strawberryVotes/totalVotes * 100).toFixed(1)
  // let eachAnswerStyles = {
  //   width: answerBarWidth + "%",
  //   height: 20 + "px",
  //   backgroundColor: "#fc5a8d",
  // };

  function calcPercentage(count: number) {
    if (answerCount === 0) {
      return "0";
    }
    return ((count / answerCount) * 100).toFixed(1);
  }

  return (
    <Card className="SingularQuestion" variant="outlined">
      {question.text}
      {countArray.map((eachAnswer) => (
        <ul key={eachAnswer.name} style={{ listStyle: "none" }}>
          <li>
            {eachAnswer.name}: {calcPercentage(eachAnswer.count)}%
            <div
              className="eachAnswerStyles"
              style={{
                backgroundColor: "#2196F3",
                height: "20px",
                width: calcPercentage(eachAnswer.count) + "%",
              }}
            ></div>
            <p>{eachAnswer.memberNames.join(", ")}</p>
          </li>
        </ul>
      ))}
    </Card>
  );
};

export default SingularQuestion;
