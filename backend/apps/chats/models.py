from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from utils.models import AbstractTimestampedModel

UserModel = get_user_model()


class ChatRoomStatus(models.TextChoices):
    OPEN = 'open'
    CLOSED = 'closed'


class ChatRoomUserType(models.TextChoices):
    ANONYMOUS = 'anonymous'
    USER = 'user'
    BOT = 'bot'


class ChatUser(AbstractTimestampedModel):
    name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    user = models.ForeignKey(
        UserModel, null=True, blank=True, on_delete=models.SET_NULL, related_name='chat_rooms')
    user_type = models.CharField(
        choices=ChatRoomUserType.choices, max_length=10)

    def __str__(self):
        return str(self.user_type) + " - " + (
            str(self.id) if self.user_type == ChatRoomUserType.ANONYMOUS else str(self.user))


class ChatRoom(AbstractTimestampedModel):
    allow_anonymous = models.BooleanField(default=False)
    bot_chat_id = models.CharField(
        max_length=20, unique=True, null=False, blank=True, )
    title = models.CharField(max_length=100)
    owner = models.ForeignKey(
        ChatUser, null=True, blank=True, on_delete=models.SET_NULL, related_name='chat_rooms_owned')
    users = models.ManyToManyField(UserModel)
    status = models.CharField(
        choices=ChatRoomStatus.choices, default=ChatRoomStatus.OPEN, max_length=10)

    def __str__(self):
        return self.title


class ChatMessage(AbstractTimestampedModel):
    chat_room = models.ForeignKey(
        ChatRoom, null=True, blank=True, on_delete=models.SET_NULL, related_name='chat_messages')
    msg = models.CharField(max_length=1000, null=True, blank=True)
    owner = models.ForeignKey(
        ChatUser, null=True, blank=True, on_delete=models.SET_NULL, related_name='chat_messages_owned')
    recipient = models.ForeignKey(ChatUser, null=True, blank=True, on_delete=models.SET_NULL,
                                  verbose_name='recipient', related_name='to_user', db_index=True)
    sent_time = models.DateTimeField(null=True, blank=True)
    responded_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.chat_room) + '-' + str(self.owner)


class RequestTicketStatus(models.TextChoices):
    OPEN = 'open', _('Open')
    CLOSED = 'closed', _('Closed')


class RequestTicket(AbstractTimestampedModel):
    requested_chat_room = models.ForeignKey(
        ChatRoom, null=True, blank=True, on_delete=models.SET_NULL, related_name='question_tickets_from')
    requested_chat_message = models.ForeignKey(
        ChatMessage, null=True, blank=True, on_delete=models.SET_NULL)
    to_chat_room = models.ForeignKey(
        ChatRoom, null=True, blank=True, on_delete=models.SET_NULL, related_name='question_tickets_to')
    msg = models.CharField(max_length=1000, null=True, blank=True)
    sender = models.ForeignKey(
        ChatUser, null=True, blank=True, on_delete=models.SET_NULL)
    owner = models.ForeignKey(ChatUser, null=True, blank=True, on_delete=models.SET_NULL,
                              related_name='question_tickets_owned')
    status = models.CharField(choices=RequestTicketStatus.choices, default=RequestTicketStatus.OPEN,
                              max_length=10)

    def __str__(self):
        return str(self.requested_chat_room) + '-' + str(self.owner)
