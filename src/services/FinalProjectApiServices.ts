/** @format */

import axios from "axios";
import { Group, GroupMember, Question } from "../models/IceBreaker";

const baseUrl: string = process.env.REACT_APP_FINALPROJECT_API_URL || "";
if (!baseUrl) {
  console.error("Missing config: REACT_APP_FINALPROJECT_API_URL");
}

export function fetchAllGroupMembers(groupId: string): Promise<GroupMember[]> {
  return axios
    .get(`${baseUrl}/group-members`, { params: { groupId: groupId } })
    .then((res) => res.data);
}

export function fetchAllGroupsByUser(userUid: string): Promise<GroupMember[]> {
  return axios
    .get(`${baseUrl}/group-members`, { params: { userUid: userUid } })
    .then((res) => res.data);
}

export function fetchAllGroups(): Promise<Group[]> {
  return axios.get(`${baseUrl}/groups`).then((res) => res.data);
}

export function fetchGroupById(_id: string): Promise<Group> {
  return axios
    .get(`${baseUrl}/groups/${encodeURIComponent(_id)}`, {
      // params: {
      //   _id: _id,
      // },
    })
    .then((response) => {
      return response.data;
    });
}

export function addGroupMember(member: GroupMember): Promise<GroupMember> {
  return axios.post(`${baseUrl}/group-members`, member).then((res) => res.data);
}

export function addGroup(group: Group): Promise<Group> {
  return axios.post(`${baseUrl}/groups`, group).then((res) => res.data);
}

export function updateGroup(group: Group): Promise<Group> {
  return axios
    .put(`${baseUrl}/groups/${encodeURIComponent(group._id!)}`, group)
    .then((res) => res.data);
}

export function updateGroupMember(member: GroupMember): Promise<GroupMember> {
  return axios
    .put(`${baseUrl}/group-members/${encodeURIComponent(member._id!)}`, member)
    .then((res) => res.data);
}
