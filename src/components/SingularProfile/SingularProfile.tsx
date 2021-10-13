import { GroupMember } from "../../models/IceBreaker";
import "./SingularProfile.css";
import questions from "../../questions/questions";
import { Card, Typography } from "@mui/material";

interface Props {
  groupMember: GroupMember;
}

const SingularProfile = ({ groupMember }: Props) => {
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
        <Typography variant="body2">
          {groupMember.answers.map(
            (eachAnswer) =>
              //grab question ids from each answer and find each id of question and where it matches in order to display
              eachAnswer.answer
          )}
          <br />
        </Typography>
      </Card>
    </div>
  );
};

export default SingularProfile;
