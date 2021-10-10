import axios from "axios";
import { Group, GroupMember } from "../models/IceBreaker";

const baseUrl: string = process.env.REACT_APP_FINALPROJECT_API_URL || "";
if (!baseUrl) {
  console.error("Missing config: REACT_APP_FINALPROJECT_API_URL");
}

export function fetchAllGroupMembers(): Promise<GroupMember[]> {
  return axios.get(`${baseUrl}/group-members`).then((res) => res.data);
}

export function fetchAllGroups(): Promise<Group[]> {
  return axios.get(`${baseUrl}/groups`).then((res) => res.data);
}

export function addGroupMember(member: GroupMember): Promise<GroupMember> {
  return axios.post(`${baseUrl}/group-members`, member).then((res) => res.data);
}

export function addGroup(group: Group): Promise<Group> {
  return axios.post(`${baseUrl}/groups`, group).then((res) => res.data);
}