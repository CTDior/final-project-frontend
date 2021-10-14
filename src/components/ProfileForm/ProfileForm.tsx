import { Button, FormControl, TextField } from "@mui/material";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Answer, Group, GroupMember } from "../../models/IceBreaker";
import { addGroupMember } from "../../services/FinalProjectApiServices";
import "./ProfileForm.css";
import questions from "../../questions/questions";
import ProfileQuestion from "./ProfileQuestion";

interface Props {
  group: Group;
  onComplete: () => void;
}

const ProfileForm = ({ group, onComplete }: Props) => {
  const [memberName, setMemberName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);

  useEffect(() => {
    setAnswers(
      group.profileQuestions.map((questionId) => {
        return { questionId: questionId, answer: "" };
      })
    );
  }, [group]);

  useEffect(() => {
    if (currentQuestionIndex === answers.length) {
      goToNextQuestion();
      handleSave();
    }
  }, [currentQuestionIndex, answers]);

  const { user } = useContext(AuthContext);
  function handleAddGroupMember(groupMember: GroupMember) {
    addGroupMember(groupMember).then(onComplete);
  }

  async function handleSave() {
    const groupMember: GroupMember = {
      userUid: user?.uid!,
      groupId: group._id!,
      groupName: group.name,
      memberName: memberName,
      birthday: birthday,
      favoriteColor: favoriteColor,
      answers: answers,
    };
    handleAddGroupMember(groupMember);
  }

  function handleAnswer(answer: string) {
    setAnswer(currentQuestionIndex, answer);
    // if (currentQuestionIndex === answers.length - 1) {
    //   handleSave();
    // } else {
    goToNextQuestion();
    // }
  }

  function goToNextQuestion() {
    setCurrentQuestionIndex((prev) => prev + 1);
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    goToNextQuestion();
  }

  function setAnswer(index: number, answer: string) {
    const newAnswer = { ...answers[index], answer };
    setAnswers((prev) => [
      ...prev.slice(0, index),
      newAnswer,
      ...prev.slice(index + 1),
    ]);
  }

  return (
    <div className="ProfileForm">
      {currentQuestionIndex === -1 ? (
        <form onSubmit={handleFormSubmit}>
          <TextField
            required
            autoFocus
            margin="dense"
            id="ProfileForm__memberName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          ></TextField>
          <TextField
            required
            autoFocus
            margin="dense"
            id="ProfileForm__birthday"
            label="Birthday (ex: January-1)"
            type="text"
            fullWidth
            variant="standard"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          ></TextField>
          <TextField
            required
            autoFocus
            margin="dense"
            id="ProfileForm__favoriteColor"
            label="What's Your Favorite Color?"
            type="text"
            fullWidth
            variant="standard"
            value={favoriteColor}
            onChange={(e) => setFavoriteColor(e.target.value)}
          ></TextField>
          {/* <Button onClick={handleSubmit}>Create Your Profile!</Button> */}
          <Button type="submit">Continue to Profile Questions</Button>
        </form>
      ) : currentQuestionIndex >= answers.length ? (
        <div>Saving...</div>
      ) : (
        <ProfileQuestion
          questionId={answers[currentQuestionIndex].questionId}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default ProfileForm;
