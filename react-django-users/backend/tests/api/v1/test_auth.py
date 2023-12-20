import jwt
import pytest
from rest_framework import status

from tests.api.v1 import v1_urls

pytestmark = [pytest.mark.api]


@pytest.mark.parametrize('url',
                         [v1_urls.TOKEN_OBTAIN, v1_urls.TOKEN_REFRESH,
                          v1_urls.TOKEN_VERIFY])
def test_endpoints_available(url, api_client):
    response = api_client.get(url)
    assert response.status_code != status.HTTP_404_NOT_FOUND, (
        f'Endpoint `{url}` not found'
    )


def test_token_obtain(api_client, user):
    user_obj, pwd = user
    data = {'email': user_obj.email, 'password': pwd}
    response = api_client.post(v1_urls.TOKEN_OBTAIN, data=data)
    assert response.status_code == status.HTTP_200_OK, 'Incorrect status code'
    assert 'access' in response.data, 'No access token in response data'
    assert 'refresh' in response.data, 'No refresh token in response data'


def test_token_refresh(api_client, api_v1_tokens):
    _, refresh = api_v1_tokens
    data_key = 'access'
    response = api_client.post(v1_urls.TOKEN_REFRESH,
                               data={'refresh': refresh})
    assert response.status_code == status.HTTP_200_OK, (
        f'{v1_urls.TOKEN_REFRESH}: '
         'incorrect status for successfull token refresh'
    )
    assert data_key in response.data, (
        (f'{v1_urls.TOKEN_REFRESH}: `{data_key}` '
         'key is missing in response data')
    )


def test_token_verify(api_client, api_v1_tokens):
    access, refresh = api_v1_tokens
    response = api_client.post(v1_urls.TOKEN_VERIFY, data={'token': access})
    assert response.status_code == status.HTTP_200_OK, (
        f'{v1_urls.TOKEN_VERIFY}: incorrect status for successfull access '
        'token verify'
    )
    response = api_client.post(v1_urls.TOKEN_VERIFY, data={'token': refresh})
    assert response.status_code == status.HTTP_200_OK, (
        f'{v1_urls.TOKEN_VERIFY}: incorrect status for successfull refresh '
        'token verify'
    )
    response = api_client.post(v1_urls.TOKEN_VERIFY,
                               data={'token': access[:-1]})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED, (
        f'{v1_urls.TOKEN_VERIFY}: incorrect status for access token verify '
        'failure'
    )
    response = api_client.post(v1_urls.TOKEN_VERIFY,
                               data={'token': refresh[:-1]})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED, (
        f'{v1_urls.TOKEN_VERIFY}: incorrect status for refresh token verify '
        'failure'
    )


def test_access_token_payload(api_v1_tokens):
    access, _ = api_v1_tokens
    role = 'role'
    decoded = jwt.decode(access, options={'verify_signature': False})
    assert role in decoded, (
        'JWT access token is missing `{role}` key in payload'
    )
