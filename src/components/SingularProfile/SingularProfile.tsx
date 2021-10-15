/** @format */

import { GroupMember } from "../../models/IceBreaker";
import "./SingularProfile.css";
import questions from "../../questions/questions";
import { Card, containerClasses, Typography } from "@mui/material";
import { group } from "console";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  groupMember: GroupMember;
  currentUserInGroup: GroupMember;
}

const SingularProfile = ({ groupMember, currentUserInGroup }: Props) => {
  console.log(groupMember);

  const { user } = useContext(AuthContext);
  console.log(user);
  console.log(currentUserInGroup);

  // we need a variable for the the current user's questions and ansers,

  // we have two arrays with the same length, and now we can compare which
  // answers are the same.
  // If an answer is the same, we can add it to a new array of boolean values.

  // const memberAnswers = groupMember.answers;
  // console.log(memberAnswers);
  const commonAnswers: boolean[] = [];
  const questionsTextAndAnswers = groupMember.answers.map((item, index) => {
    const container: any = {};
    container.question = questions.find(
      (eachQuestion) => eachQuestion._id === item.questionId
    );
    container.answer = item.answer;
    container.match = false;

    if (container.answer === currentUserInGroup.answers[index].answer) {
      container.match = true;
    }
    return container;
  });
  console.log(commonAnswers);
  console.log(questionsTextAndAnswers);
  console.log(currentUserInGroup.answers[0].answer);

  return (
    <div className="SingularProfile">
      <Card className="profileCard" variant="outlined">
        <Typography
          textAlign="center"
          variant="h5"
          color="text.secondary"
          gutterBottom
        >
          {groupMember.memberName}
        </Typography>
        <Typography textAlign="center" sx={{ fontSize: 14 }} component="div">
          {groupMember.birthday}
        </Typography>
        <Typography textAlign="center" sx={{ mb: 1.5 }} color="text.secondary">
          {groupMember.favoriteColor}
        </Typography>
        <ol>
          {questionsTextAndAnswers.map((eachQA) => (
            //grab question ids from each answer and find each id of question and where it matches in order to display
            <li>
              {eachQA.answer} {eachQA.match && <CheckIcon />}
            </li>
          ))}
        </ol>
        {/* <Typography variant="body2">
          {groupMember.answers.map(
            (eachAnswer) =>
              //grab question ids from each answer and find each id of question and where it matches in order to display
              eachAnswer.answer
          )}
          <br />
        </Typography> */}
      </Card>
    </div>
  );
};

export default SingularProfile;
