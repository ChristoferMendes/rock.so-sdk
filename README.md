# ROCK.SO API SDK

## BASIC USAGE

```typescript
import { RockAPi } from 'rock.so-sdk'

const rockApi = new RockApi(process.env.ROCK_BOT_TOKEN)

rockApi.sendMessage('Hello!')
```

### This SDK is highly typed, with all methods from  [Rock.so Public Api](https://www.rock.so/public-api) being mapped and exported!

## METHODS

All methods available on [Rock.so Public Api](https://www.rock.so/public-api) are available on the SDK, i.e.:

| Method           | Description                                                                                                                                                                                                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendMessage      | The sendMessage method allows you to send a new message.                                                                                                                                                                                                                                                   |
| createNote       | Create note.                                                                                                                                                                                                                                                                                               |
| createTask       | Create a new task.                                                                                                                                                                                                                                                                                         |
| getBotInfo       | Allows you to retrieve basic information about the public API bot.                                                                                                                                                                                                                                         |
| getCustomFields  | Allows you to retrieve information about custom fields defined for the tasks in bot’s space.                                                                                                                                                                                                              |
| getTaskLists     | Allows you to retrieve information about tasks lists defined in the bot’s space.                                                                                                                                                                                                                          |
| listLabels       | The listLabels method can be used to retrieve the list of labels assigned to tasks. Note that labels are created and deleted "on the fly"; when there are no more tasks with a given label (either the label was removed from all tasks, or all tasks with the label were deleted), that label is deleted. |
| listSpaceMembers | The listSpaceMembers method can be used to retrieve a list of space members, including both people and bots.                                                                                                                                                                                               |
| listSprints      | The listSprints method can be used to retrieve a list of sprints defined in the space.                                                                                                                                                                                                                     |


## USING ALL METHODS

### Send Message
```typescript
await rockApi.sendMessage('Hello')

```

### Create note
```typescript
await rockApi.createNote({
  body: [{ text: "hello world" }],
  labels: ["label"], //Optional
  watchersIds: ["abcd123"], //Optional
});
```


### Create a task
```typescript
import { ListIdStatusEnum, PriorityEnum } from "rock.so-sdk";

await rockApi.createTask({
  body: [{ text: "hello world" }],
  listId: ListIdStatusEnum.TO_DO,
  priority: PriorityEnum.HIGH,
  title: "hello world",
  start: 123456789, //Optional
  due: 123456789, //Optional
  owners: ["abcd123"], //Optional
  checkList: ["abcd123"], //Optional
  severity: 1, //Optional
  sprint: 1, //Optional
  customFields: ["abcd123"], //Optional
  labels: ["abcd123"], //Optional
  recurringSchedule: { //Optional
    dayOfMonth: 1,
    daysOfWeek: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    targetListId: "abcd123",
    type: 1,
    workdaysOnly: true,
  },
  watchersIds: ["abcd123"], //Optional,
});
```

### Get Bot Info
```typescript
const { data } = await rockApi.getBotInfo();
```

### Get Custom Fields
```typescript
const { data } = await rockApi.getCustomFields();
```

### Get Task Lists
```typescript
const { data } = await rockApi.getTaskLists();
```

### List Labels 
```typescript
const { data } = await rockApi.listLabels();
```

### List Space Members
```typescript
const { data } = await rockApi.listSpaceMembers();
```

### List Sprints
```typescript
const { data } = await rockApi.listSprints();
```