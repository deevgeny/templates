import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from tests.api.v1 import v1_urls

User = get_user_model()


@pytest.fixture()
def api_client():
    client = APIClient()
    return client


@pytest.fixture
def api_v1_tokens(user, api_client):
    user_obj, pwd = user
    data = {'email': user_obj.email, 'password': pwd}
    response = api_client.post(v1_urls.TOKEN_OBTAIN, data=data)
    return response.data.get('access'), response.data.get('refresh')


@pytest.fixture
def api_v1_user_client(api_client, user):
    user_obj, pwd = user
    data = {'email': user_obj.email, 'password': pwd}
    response = api_client.post(v1_urls.TOKEN_OBTAIN, data=data)
    api_client.credentials(
        HTTP_AUTHORIZATION=f'Bearer {response.data.get("access")}'
        )
    return api_client, user_obj