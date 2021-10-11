/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Group } from "../../models/IceBreaker";
import { fetchGroupById } from "../../services/FinalProjectApiServices";
import "./GroupPage.css";

interface RouteParams {
  id: string;
}

const GroupPage = () => {
  const [group, setGroup] = useState<Group>({
    _id: "",
    name: "",
  });
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    fetchGroupById(id).then((response) => {
      setGroup(response);
    });
  }, [id]);

  return <div className="GroupPage">Welcome to {group} Group Page</div>;
};

export default GroupPage;
