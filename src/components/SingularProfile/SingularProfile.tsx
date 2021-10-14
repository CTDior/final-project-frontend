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
      <Card variant="outlined">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {groupMember.memberName}
        </Typography>
        <Typography variant="h5" component="div">
          {groupMember.birthday}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {groupMember.favoriteColor}
        </Typography>
        <Typography>
          {questionsTextAndAnswers.map(
            (eachQA) =>
              //grab question ids from each answer and find each id of question and where it matches in order to display
              eachQA.answer
          )}
        </Typography>
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
