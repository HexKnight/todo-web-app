from django.urls import is_valid_path
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TodoSerializer
from base.models import Todo

@api_view(['GET'])
def action_many(_):
    data = Todo.objects.all()
    serialized = TodoSerializer(data, many=True)
    return Response(serialized.data)

@api_view(['POST', 'PUT', 'DELETE'])
def action_one(request, id):
    match request.method:
        case 'POST':
            serialized = TodoSerializer(data=request.data)
            if serialized.is_valid():
                serialized.save()
        case 'PUT':
            todo = Todo.objects.filter(id=id).first()
            serialized = TodoSerializer(instance=todo, data=request.data)
            if serialized.is_valid():
                serialized.save()
        case 'DELETE':
            Todo.objects.filter(id=id).delete()

    todos = Todo.objects.all()
    serialized_todos = TodoSerializer(todos, many=True)
    return Response(serialized_todos.data)
