from django.contrib import admin

from utils.admin import BaseAdmin
from .models import ChatRoom, ChatMessage, ChatUser, RequestTicket


@admin.register(ChatUser)
class ChatUserAdmin(BaseAdmin):
    list_display = ('id', 'name', 'email', 'user_type', 'updated_at')
    list_filter = ('name', 'email', 'user_type')
    readonly_fields = ("id",)


@admin.register(ChatRoom)
class ChatRoomAdmin(BaseAdmin):
    list_display = ('id', 'status', 'title', 'owner', 'created_at', 'updated_at')
    list_filter = ('status', 'title', 'owner')
    search_fields = ('title', 'owner')
    readonly_fields = ('id',)


@admin.register(ChatMessage)
class ChatMessageAdmin(BaseAdmin):
    list_display = ('id', 'owner', 'recipient', 'msg', 'created_at', 'updated_at')
    list_filter = ('owner', 'recipient')
    readonly_fields = ("id",)


@admin.register(RequestTicket)
class RequestTicketAdmin(BaseAdmin):
    list_display = ('id', 'to_chat_room', 'owner', 'status', 'created_at', 'updated_at')
    list_filter = ('to_chat_room', 'owner', 'status')
