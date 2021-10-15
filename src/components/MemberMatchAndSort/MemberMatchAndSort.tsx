import { GroupMember } from "../../models/IceBreaker";
import "./MemberMatchAndSort.css";

interface Props {
  groupMembers: GroupMember[];
}

function MemberMatchAndSort({ groupMembers }: Props) {
  console.log(groupMembers);
  return <div className="MemberMatchAndSort"></div>;
}

export default MemberMatchAndSort;
