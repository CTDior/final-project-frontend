/** @format */

import "./ProfileQuestion.css";
import questions from "../../questions/questions";
import { Question } from "../../models/IceBreaker";
import { Box, Button, ButtonGroup } from "@mui/material";

interface Props {
  questionId: string;
  onAnswer: (answer: string) => void;
}

function ProfileQuestion({ questionId, onAnswer }: Props) {
  const question: Question | undefined = questions.find(
    (eachQuestion) => questionId === eachQuestion._id
  );
  if (!question) {
    return <div>Error: No such question Id.</div>;
  }
  return (
    <div className="ProfileQuestion">
      {question.text}
      {question.options.map((option) => {
        return (
          <Box
            sx={{
              display: "flex-box",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup size="large" orientation="vertical">
              <Button
                onClick={() => onAnswer(option)}
                variant="outlined"
                key={option}
              >
                {option}
              </Button>
            </ButtonGroup>
          </Box>
        );
      })}
    </div>
  );
}

export default ProfileQuestion;
