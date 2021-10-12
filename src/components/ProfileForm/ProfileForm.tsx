import { Button, FormControl, TextField } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { GroupMember } from "../../models/IceBreaker";
import { addGroupMember } from "../../services/FinalProjectApiServices";
import "./ProfileForm.css";

interface RouteParams {
  id: string;
}

const ProfileForm = () => {
  const [memberName, setMemberName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const { user } = useContext(AuthContext);
  function handleAddGroupMember(groupMember: GroupMember) {
    addGroupMember(groupMember);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const groupMember: GroupMember = {
      userUid: user?.uid!,
      groupId: id,
      groupName: "",
      memberName: memberName,
      birthday: birthday,
      favoriteColor: favoriteColor,
      answers: [],
    };
    handleAddGroupMember(groupMember);
  }
  const { id } = useParams<RouteParams>();
  return (
    <div className="ProfileForm">
      <FormControl>
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
          label="Birthday (month/day)"
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
        <Button onClick={handleSubmit}>Create Your Profile!</Button>
      </FormControl>
    </div>
  );
};

export default ProfileForm;
