from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .serializers import (
    UserChangePasswordSerializer,
    UserCreateSerializer,
    UserEditSerializer,
    UserReadSerializer,
)

User = get_user_model()


class UserAccountView(GenericViewSet, CreateModelMixin):
    """User account view.
    User actions:
        - Create account (register): POST /
        - Get account data: GET /me
        - Update account data: PATCH /me
        - Change password: POST /change-password
        - Delete account: DELETE /me (not implemented yet)
    """

    permission_classes = [AllowAny]  # To register new users
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserCreateSerializer
        if self.request.method == 'PATCH':
            return UserEditSerializer
        return UserReadSerializer  # Default for GET request

    @action(methods=['GET', 'PATCH'], detail=False,
            permission_classes=[IsAuthenticated])
    def me(self, request):
        """Get or update user data."""
        if request.method == 'GET':
            serializer = UserReadSerializer(request.user)
            return Response(serializer.data)
        # PATCH request
        user = get_object_or_404(User, id=request.user.id)
        serializer = UserEditSerializer(user, data=request.data,
                                        partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(methods=['POST'], detail=False, url_path='change-password',
            permission_classes=[IsAuthenticated])
    def change_password(self, request):
        """Change user password."""
        user = get_object_or_404(User, id=request.user.id)
        serializer = UserChangePasswordSerializer(user, data=request.data,
                                                  partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
