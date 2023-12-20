import pytest
from django.contrib.auth import get_user_model
from rest_framework import status

from tests.api.v1 import v1_urls

pytestmark = [pytest.mark.api, pytest.mark.django_db]
User = get_user_model()


@pytest.mark.parametrize('url',
                         [v1_urls.REGISTER, v1_urls.PROFILE,
                          v1_urls.CHANGE_PASSWORD])
def test_endpoints_available(url, api_client):
    response = api_client.get(url)
    assert response.status_code != status.HTTP_404_NOT_FOUND, (
        f'Endpoint `{url}` not found'
    )


def test_profile(api_v1_user_client):
    api_client, user_obj = api_v1_user_client
    photo = lambda file_name: file_name if len(file_name) else None
    data = {
        'id': user_obj.id,
        'first_name': user_obj.first_name,
        'last_name': user_obj.last_name,
        'email': user_obj.email,
        'role': user_obj.role.value,
        'phone': user_obj.phone,
        'photo': photo(user_obj.photo.name)
        }
    response = api_client.get(v1_urls.PROFILE)
    assert response.status_code == status.HTTP_200_OK, (
        f'{v1_urls.PROFILE}: incorrect status for successfull GET request'
    )
    assert response.data == data, 'Incorrect response data'


def test_profile_update(api_v1_user_client):
    api_client, user_obj = api_v1_user_client
    data = {'first_name': 'New'}
    response = api_client.patch(v1_urls.PROFILE, data=data)
    assert response.status_code == status.HTTP_200_OK, (
        f'{v1_urls.PROFILE}: incorrect status for successfull PATCH request'
    )
    user_obj.refresh_from_db()
    assert user_obj.first_name == data.get('first_name'), (
        f'{v1_urls.PROFILE}: database was not updated with PATCH request'
    )


def test_password_change(api_v1_user_client):
    api_client, user_obj = api_v1_user_client
    hashed_pwd = user_obj.password
    data = {'new_password': 'SomeStrongPassword',
            're_password': 'SomeStrongPassword'}
    response = api_client.post(v1_urls.CHANGE_PASSWORD, data=data)
    assert response.status_code == status.HTTP_200_OK, (
        f'{v1_urls.CHANGE_PASSWORD}: incorrect status for successfull PATCH '
        'request'
    )
    assert response.data == {}, (
        'Response data should be empty on password change'
    )
    user_obj.refresh_from_db()
    assert hashed_pwd != user_obj.password, (
        f'{v1_urls.CHANGE_PASSWORD}: password in database was not updated '
        'with PATCH request'
    )
    assert user_obj.password != data.get('new_password'), (
        f'{v1_urls.CHANGE_PASSWORD}: new password was saved in database '
        'without hashing'
    )


def test_register_new_user(api_client):
    data = {'first_name': 'Name',
            'last_name': 'Last',
            'email': 'new@example.com',
            'password': 'StrongPassword123'}
    response = api_client.post(v1_urls.REGISTER, data=data)
    assert response.status_code == status.HTTP_201_CREATED, (
        f'{v1_urls.REGISTER}: incorrect status for successfull user '
        'registration'
    )
    assert User.objects.filter(email=data.get('email')).exists(), (
        f'{v1_urls.REGISTER}: new user was not created in database after POST '
        'request'
    )
