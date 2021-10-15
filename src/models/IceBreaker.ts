/** @format */

export interface Question {
  _id?: string;
  text: string;
  options: string[];
}

export interface GroupMember {
  _id?: string;
  userUid: string;
  groupId: string;
  groupName: string;
  memberName: string;
  birthday: string;
  favoriteColor: string;
  answers: Answer[];
}
export interface Answer {
  questionId: string;
  answer: string;
}
export interface Group {
  _id?: string;
  name: string;
  adminUid: string;
  profileQuestions: string[];
}
