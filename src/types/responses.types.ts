export type GetBotInfoResponse = {
  botName: string;
  spaceName: string;
} | null;

export type GetCustomFieldsResponse =
  | [
      | {
          id: number;
          title: string;
          type: "NUMBER";
        }
      | {
          id: number;
          title: string;
          type: "TEXT";
        }
      | {
          id: number;
          title: string;
          type: "SELECT";
          options: [
            {
              option: string;
              title: string;
            }
          ];
        }
    ]
  | null;

export type GetTaskListsResponse =
  | [{ id: number; name: string; color: string; completed?: boolean }]
  | null;

export type ListLabelsResponse = {
  labels: string[];
};

export type SpaceMember = {
  id: number;
  userId: string;
  role: string;
  state: string;
  invitedAt: string;
  joinedAt: string;
  removedAt: string;
  suspendedAt: string;
  invitedBy: string;
  name: string;
  avatarBig: string;
  avatarSmall: string;
  tazOffset: number;
  orgId: string;
  email: string;
  emailAliases?: string[];
  phone?: string;
};

export type ListSpaceMembersResponse = {
  members: SpaceMember[];
  hasMore?: boolean;
  nextCursor?: string;
};

export type ListSprintsResponse = {
  sprints:
    | {
        id: number;
        name: string;
      }[]
    | null;
};

export type SendMessageResponse = {
  id: number;
};

export type CreateNoteResponse = {
  id: number;
};

export type CreateTaskResponse = {
  id: number;
};
