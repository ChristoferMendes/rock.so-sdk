import axios, { AxiosInstance, AxiosError } from "axios";
import {
  CreateNoteRequest,
  CreateTaskRequest,
  PriorityEnum,
} from "./types/payloads.types";
import {
  CreateNoteResponse,
  CreateTaskResponse,
  GetBotInfoResponse,
  GetCustomFieldsResponse,
  GetTaskListsResponse,
  ListLabelsResponse,
  ListSpaceMembersResponse,
  ListSprintsResponse,
  SendMessageResponse,
} from "./types/responses.types";

export class RockApi {
  private readonly baseUrl = "https://api.rock.so/webhook/bot";
  private readonly api: AxiosInstance;
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
    this.api = axios.create({ baseURL: this.baseUrl });
    this._initParamsInterceptor();
    this._authenticate();
  }

  sendMessage(text: string) {
    return this._post<SendMessageResponse>({ text }, "sendMessage");
  }

  createNote({ body, labels, watchersIds: watchers }: CreateNoteRequest) {
    return this._post<CreateNoteResponse>(
      { body, labels, watchers },
      "createNote"
    );
  }

  createTask(payload: CreateTaskRequest) {
    this._validateCreateTaskPayload(payload);

    return this._post<CreateTaskResponse>(payload, "createTask");
  }

  private _validateCreateTaskPayload(payload: CreateTaskRequest) {
    const requiredFields = ["listId", "title"] as Array<
      keyof CreateTaskRequest
    >;

    const priorityValues = Object.values(PriorityEnum);

    if (!priorityValues.includes(payload.priority)) {
      throw new Error(`Invalid priority value: ${payload.priority}`);
    }

    for (const field of requiredFields) {
      if (!payload[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }

  getBotInfo() {
    return this._get<GetBotInfoResponse>("getBotInfo");
  }

  getCustomFields() {
    return this._get<GetCustomFieldsResponse>("getCustomFields");
  }

  getTaskLists() {
    return this._get<GetTaskListsResponse>("getTaskLists");
  }

  listLabels() {
    return this._get<ListLabelsResponse>("listLabels");
  }

  listSpaceMembers() {
    return this._get<ListSpaceMembersResponse>("listSpaceMembers");
  }

  listSprints() {
    return this._get<ListSprintsResponse>("listSprints");
  }

  private async _get<TData>(method: string) {
    try {
      return await this.api.get<TData>("", { params: { method } });
    } catch (e) {
      const err = e as AxiosError;

      if (err.response?.status === 401) {
        throw new Error("Invalid token");
      }

      throw err;
    }
  }

  private async _post<TData>(body: any, method: string) {
    try {
      return await this.api.post<TData>("", body, { params: { method } });
    } catch (e) {
      const err = e as AxiosError;

      if (err.response?.status === 401) {
        throw new Error("Invalid token");
      }

      throw err;
    }
  }

  private _initParamsInterceptor() {
    this.api.interceptors.request.use((config) => {
      const auth = this.token;

      config.params = {
        auth,
        ...config.params,
      };

      return config;
    });
  }

  private async _authenticate() {
    try {
      await this.getBotInfo();
    } catch (e) {
      const err = e as AxiosError;

      if (err.response?.status === 401) {
        return console.error("Your bot failed to initialize: Invalid token");
      }

      console.error("Your bot failed to initialize:", err.message);
    }
  }
}
