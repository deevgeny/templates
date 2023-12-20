from django.urls import path

from docs.views import schema_view_v1

app_name = 'docs'


urlpatterns = [
    path('api/v1/docs', schema_view_v1.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
]
