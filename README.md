# ROCK.SO API SDK

## USAGE

```typescript
import { RockAPi } from 'rock.so-api'

const rockApi = new RockApi(process.env.ROCK_BOT_TOKEN)

rockApi.sendMessage('Hello!')
```

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
