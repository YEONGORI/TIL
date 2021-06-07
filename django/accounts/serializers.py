# client 입력을 JSON으로 바꾸기 위한 serializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    # ModelSerializer 클래스는 model(UserAccount)과 밀접하게 매핑되는 serializer 클래스가 필요할때 사용

    class Meta:
        model = User
        fields = ("id", "email", "username", "password")
