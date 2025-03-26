import { after, describe, it } from "node:test";
import { RockApi } from "..";
import assert from "node:assert";
import { config } from "dotenv";
import { ListIdStatusEnum, PriorityEnum } from "../types/payloads.types";

config();

describe("Rock Api", () => {
  const api = new RockApi(process.env.ROCK_API_TOKEN ?? "");

  after(async () => {
    await api.sendMessage(
      " *[ROCK SDK]* Tests have been completed and passed successfully!\n\nNew package version update is available: https://www.npmjs.com/package/rock.so-sdk",
    );
  });

  describe("Get bot info", () => {
    it("should return bot info", async () => {
      const { data: botInfo } = await api.getBotInfo();

      if (!botInfo) {
        throw new Error("Bot info is undefined");
      }

      const expectedObjectShape = {
        botName: "string",
        spaceName: "string",
      };

      assert.deepStrictEqual(
        Object.keys(botInfo),
        Object.keys(expectedObjectShape),
      );
    });
  });

  describe("Get custom fields", () => {
    it("should return custom fields", async () => {
      const { data: customFields } = await api.getCustomFields();

      if (!customFields) {
        return assert.strictEqual(customFields, null);
      }

      const expectedObjectShape = [
        {
          id: 1,
          title: "string",
          type: "TEXT",
        },
      ];

      assert.deepStrictEqual(
        Object.keys(customFields),
        Object.keys(expectedObjectShape),
      );
    });
  });

  describe("Get task lists", () => {
    it("should return 200", async () => {
      const { data: taskLists, status } = await api.getTaskLists();

      if (!taskLists) {
        assert.strictEqual(taskLists, null);
      }

      assert.strictEqual(status, 200);
    });
  });

  describe("List labels", () => {
    it("should return 200", async () => {
      const { status, data } = await api.listLabels();

      if (!data.labels.length) {
        return assert.strictEqual(data.labels, null);
      }

      assert.strictEqual(status, 200);
    });
  });

  describe("List space members", () => {
    it("should return 200", async () => {
      const { status, data } = await api.listSpaceMembers();

      if (!data.members.length) {
        assert.strictEqual(data.members, null);
      }

      assert.strictEqual(status, 200);
    });
  });

  describe("List sprints", () => {
    it("should return 200", async () => {
      const { status, data } = await api.listSprints();

      if (!data.sprints?.length) {
        assert.strictEqual(data.sprints, null);
      }

      assert.strictEqual(status, 200);
    });
  });

  describe("Send message", () => {
    it("should send a message", async () => {
      const { status, data } = await api.sendMessage(
        "*[ROCK SDK]* Message sent by automated tests of *rock.so-sdk*",
      );

      if (!data.id) {
        throw new Error("Message id is undefined");
      }

      const expectedObjectShape = {
        id: 1,
      };

      assert.deepStrictEqual(
        Object.keys(data),
        Object.keys(expectedObjectShape),
      );
      assert.strictEqual(status, 200);
    });
  });

  describe("Create note", () => {
    it("should create a note", async () => {
      const { status, data } = await api.createNote({
        body: [
          {
            text: "[ROCK SDK] Note created by automated tests of rock.so-sdk",
          },
        ],
      });

      if (!data.id) {
        throw new Error("Note id is undefined");
      }

      const expectedObjectShape = {
        id: 1,
      };

      assert.deepStrictEqual(
        Object.keys(data),
        Object.keys(expectedObjectShape),
      );
      assert.strictEqual(status, 200);
    });
  });

  describe("Create task", () => {
    it("should create a task", async () => {
      const { status, data } = await api.createTask({
        body: [
          {
            text: "[ROCK SDK] Task body created by automated tests of rock.so-sdk",
          },
        ],
        listId: ListIdStatusEnum.DOING,
        priority: PriorityEnum.HIGHEST,
        title:
          "[ROCK SDK] Task title created by automated tests of rock.so-sdk",
        watchers: ["mAmm237A"],
      });

      if (!data.id) {
        throw new Error("Task id is undefined");
      }

      const expectedObjectShape = {
        id: 1,
      };

      assert.deepStrictEqual(
        Object.keys(data),
        Object.keys(expectedObjectShape),
      );
      assert.strictEqual(status, 200);
    });
  });
});
