from rest_framework.serializers import ModelSerializer
from base.models import Todo

class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'name', 'checked']
