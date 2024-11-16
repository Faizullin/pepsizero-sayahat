
import random

from ..models import ChatRoom, ChatUser


def get_or_generate_chat_room(room_id=None, owner: ChatUser = None) -> ChatRoom:
    bot_session_id = str(random.randint(0, 99)+100000)
    if room_id:
        chat_room_q = ChatRoom.objects.filter(id=room_id,)
        chat_room = chat_room_q.last() if chat_room_q.exists() else ChatRoom.objects.create(
            bot_chat_id=bot_session_id,
            title='Chat-' + bot_session_id,
            owner=owner,
        )
        chat_room.users.add(owner)
        chat_room.save()
    # else:
    #     chat_room = ChatRoom.objects.create(
    #         bot_chat_id=bot_session_id,
    #         title='Chat-' + bot_session_id,
    #         owner=owner,
    #     )
    #     chat_room.users.add(owner, get_bot())
    #     chat_room.save()
    return chat_room

