from django.db import models

class Todo(models.Model):
    # id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    checked = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
