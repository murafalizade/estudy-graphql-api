import { gql } from 'apollo-server-express';
export default gql`
  scalar Date
  scalar Upload
  type File {
    url: String
  }
  type User {
    id: ID!
    userId: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    notifications: [Noticifation]!
    subject: [Course]!
    isTeacher: Boolean!
  }
  type Tags {
    id: String
    text: String
  }

  type Course {
    id: ID
    teacherId: ID
    spoken: String
    title: String!
    teacherName: String
    description: String!
    picture: String
    dates: [String]
    joincounter: Int!
    priceSingle: Int!
    priceGroup: Int!
    category: String
    subCategory: String
    minStudentCount: Int
    maxStudentCount: Int
    keyWord: [Tags]
    groups: [Groups]
    singleorgroup: String
    joiner: [User]
  }
  type Noticifation {
    id: ID!
    title: String!
    createDate: Date
    content: String!
    seen: Boolean!
  }
  type Groups {
    title: String
    startDate: [String!]
    endDate: [String!]
    id: ID!
  }
  input GroupsInfo {
    title: String
    startDate: [String!]
    endDate: [String!]
  }
  type Teacher {
    id: ID!
    userId: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    notifications: [Noticifation]
    subject: [Course]!
    isTeacher: Boolean!
    accepted: String!
    courses: [Course]
    bio: String
    speacilist: String
    picture_url: String
    video_url: String
    stars: Int!
    income: Int!
    experience: String
  }
  input RegisterInfo {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isAdmin: Boolean
  }

  input LoginInfo {
    email: String!
    password: String!
  }

  input TutorInfo {
    userId: ID!
    bio: String
    speacilist: String
    picture: Upload
    experience: String
  }
  type Dating {
    day: String
    startTime: String
    endTime: String
  }
  input Tag {
    id: ID
    text: String
  }
  input CourseInfo {
    teacherId: ID!
    title: String!
    description: String!
    spoken: String!
    priceSingle: Int
    priceGroup: Int
    category: String
    subcategory: String
    keyWord: [Tag]!
    groups: [GroupsInfo]
    singleorgroup: String!
    dates: [String]
  }
  input NotificationInfo {
    senderId: ID!
    title: String!
    createDate: Date
    content: String!
  }

  input UpdateUserInfo {
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type seenUser {
    firstName: String
    lastName: String
  }
  type Message {
    conservation: String
    sender: String
    text: String
  }
  type Conversations {
    conversation: [Message]
  }

  type Query {
    users: [User]!
    teachers: [Teacher]!
    user(id: ID!): User
    userOwn(userId: ID!): User
    teacher(id: ID!): Teacher
    teacherOwn(userId: ID!): Teacher
    courses: [Course]!
    course(id: ID!): Course
    messages(conId: ID!): Message
    filterCourse: [Course]
    courseOwn(id: ID!, teacherId: ID!): Course
    notification(id: ID!, senderid: ID!): Noticifation
  }
  type Mutation {
    registerUser(registerInfo: RegisterInfo!): String
    loginUser(loginInfo: LoginInfo!): String
    becomeTutor(tutorInfo: TutorInfo): String
    createCourse(courseInfo: CourseInfo): String
    createdNotification(notificationInfo: NotificationInfo): String
    seenNotification(id: ID!): Noticifation
    joinCourse(courseId: ID!, userId: ID!, groupId: ID): String
    updateUserProfile(userId: ID!, userInfo: UpdateUserInfo): User!
    giveStar(teacherId: ID!, point: Int): String
    uploadFile(file: Upload!): File
  }
  type Subscription {
    notifications: [Noticifation]
  }
`;
