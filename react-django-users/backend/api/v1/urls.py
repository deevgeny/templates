from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .users.views import UserAccountView

router = DefaultRouter(trailing_slash=False)
router.register('users', UserAccountView)


urlpatterns = [
    path('auth/token/obtain', TokenObtainPairView.as_view()),
    path('auth/token/refresh', TokenRefreshView.as_view()),
    path('auth/token/verify', TokenVerifyView.as_view()),
    path('', include(router.urls))
]
