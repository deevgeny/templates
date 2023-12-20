from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom token obtain pair serializer."""
    @classmethod
    def get_token(cls, user):
        """Add user role to token payload."""
        token = super().get_token(user)
        token['role'] = user.role
        return token
