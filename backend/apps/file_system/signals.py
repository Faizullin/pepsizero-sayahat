from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

from .models import File


# Signal to delete file from storage when a File instance is deleted
@receiver(post_delete, sender=File)
def delete_file_from_storage(sender, instance, **kwargs):
    if instance.file:
        instance.file.delete(save=False)


# Signal to handle file replacement on update
@receiver(pre_save, sender=File)
def replace_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return  # Skip if creating a new instance

    try:
        old_file = sender.objects.get(pk=instance.pk).file
    except sender.DoesNotExist:
        return

    new_file = instance.file
    if old_file and old_file != new_file:
        old_file.delete(save=False)
