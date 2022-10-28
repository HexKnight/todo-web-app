from django.urls import path
from .views import *

urlpatterns = [
    path('', action_many, name='get'),
    path('<int:id>/', action_one, name='get'),
]
