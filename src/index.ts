import axios, { AxiosInstance, AxiosError } from "axios";
import { CreateNoteRequest, CreateTaskRequest, Priority } from "./types";

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
    return this.api.post("", { text }, { params: { method: "sendMessage" } });
  }

  
  createNote({ body, labels, watchers }: CreateNoteRequest) {
    return this.api.post(
      "",
      { body, labels, watchers },
      { params: { method: "createNote" } }
    );
  }

  createTask(payload: CreateTaskRequest) {
    this._validateCreateTaskPayload(payload);

    return this.api.post("", { payload }, { params: { method: "createTask" } });
  }

  private _validateCreateTaskPayload(payload: CreateTaskRequest) {
    const requiredFields = ["listId", "title"] as Array<
      keyof CreateTaskRequest
    >;

    const priorityValues = Object.values(Priority);

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
    return this._get("getBotInfo");
  }

  getCustomFields() {
    return this._get("getCustomFields");
  }

  getTaskLists() {
    return this._get("getTaskLists");
  }

  listLabels() {
    return this._get("listLabels");
  }

  listSpaceMembers() {
    return this._get("listSpaceMembers");
  }

  private _get(method: string) {
    return this.api.get("", { params: { method } })
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
      await this.api.get("", { params: { method: "getBotInfo" } });
    } catch (e) {
      const err = e as AxiosError;

      if (err.response?.status === 401) {
        return console.error("Your bot failed to initialize: Invalid token");
      }

      console.error("Your bot failed to initialize:", err.message);
    }
  }

}