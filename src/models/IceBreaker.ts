export interface GroupMember {
  _id?: string;
  userUid: string;
  groupId: string;
  groupName: Group;
  memberName: string;
  birthday: string;
  answers: string;
}

export interface Group {
  _id?: string;
  name: string;
  adminUid?: string;
  profileQuestions?: string;
}
