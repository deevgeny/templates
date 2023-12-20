from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from api.urls import urlpatterns

schema_view_v1 = get_schema_view(
    openapi.Info(
        title="Paint Shop Tools API",
        default_version='v1',
        description="Paint Shop Tools project",
        terms_of_service="#",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    url="http://127.0.0.1:8000/api/v1",
    patterns=[urlpatterns[0]],
)
