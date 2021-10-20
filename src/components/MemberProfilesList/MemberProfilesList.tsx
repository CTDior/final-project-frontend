/** @format */
import "./MemberProfilesList.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GroupMember } from "../../models/IceBreaker";
import { fetchGroupById } from "../../services/FinalProjectApiServices";
import SingularProfile from "../SingularProfile/SingularProfile";

interface RouteParams {
  id: string;
}
interface Props {
  groupMembers: GroupMember[];
  currentUserInGroup: GroupMember;
}

function MemberProfilesList({ groupMembers, currentUserInGroup }: Props) {
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    fetchGroupById(id).then((response) => {});
  }, [id]);

  return (
    <div className="MemberProfilesList">
      {groupMembers.map((eachMember) => (
        <SingularProfile
          key={eachMember.userUid}
          groupMember={eachMember}
          currentUserInGroup={currentUserInGroup}
        />
      ))}
    </div>
  );
}

export default MemberProfilesList;
