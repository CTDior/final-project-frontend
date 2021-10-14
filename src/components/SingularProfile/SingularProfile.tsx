import { GroupMember } from "../../models/IceBreaker";
import "./SingularProfile.css";
import questions from "../../questions/questions";
import { Card, containerClasses, Typography } from "@mui/material";
import { group } from "console";

interface Props {
  groupMember: GroupMember;
}

const SingularProfile = ({ groupMember }: Props) => {
  console.log(groupMember);

  // const memberAnswers = groupMember.answers;
  // console.log(memberAnswers);
  const questionsTextAndAnswers = groupMember.answers.map((item) => {
    const container: any = {};
    container.question = questions.find(
      (eachQuestion) => eachQuestion._id === item.questionId
    );
    container.answer = item.answer;
    return container;
  });
  console.log(questionsTextAndAnswers);

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
            <li>{eachQA.answer}</li>
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
