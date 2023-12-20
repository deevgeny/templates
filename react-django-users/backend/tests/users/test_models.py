from itertools import zip_longest

import pytest
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import MaxLengthValidator
from django.db import models

from users.models import phone_validator, profile_photo

pytestmark = pytest.mark.unit


User = get_user_model()


@pytest.mark.parametrize('_class, constant',
                         zip_longest([], ['Role'],
                                     fillvalue=User))
def test_model_enum_choice_exists(_class, constant):
    assert hasattr(_class, constant), f'Missing {_class}.{constant} enum choice'


@pytest.mark.parametrize('choice, name',
                         [[User.Role.USER.name, 'USER'],
                          [User.Role.ADMIN.name, 'ADMIN'],])
def test_model_role_enum_choice_field_names(choice, name):
    assert choice == name, f'Incorrect {choice} name'


@pytest.mark.parametrize('choice, label',
                         [[User.Role.USER.label, 'Пользователь'],
                          [User.Role.ADMIN.label, 'Администратор'],])
def test_model_role_enum_choice_field_labels(choice, label):
    assert choice == label, f'Incorrect {choice} label'


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'email address'],
                          ['unique', True]])
def test_email_field(field_attr, value):
    field = 'email'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'first name'],
                          ['max_length', 150],
                          ['blank', False]])
def test_first_name_field(field_attr, value):
    field = 'first_name'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'last name'],
                          ['max_length', 150],
                          ['blank', False]])
def test_last_name_field(field_attr, value):
    field = 'last_name'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'role'],
                          ['max_length', 16],
                          ['choices', User.Role.choices],
                          ['default', User.Role.USER]])
def test_role_field(field_attr, value):
    field = 'role'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'phone number'],
                          ['max_length', 18],
                          ['blank', True],])
def test_phone_field(field_attr, value):
    field = 'phone'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


def test_phone_fields_validators():
    field = 'phone'
    count = 2
    validators = ['phone_validator']
    assert len(User._meta.get_field(field).validators) == count, (
        f'User.{field} should have {count} validators'
    )
    assert User._meta.get_field(field).validators[0].__name__ in validators, (
         '`phone_is_digit` validator is missing'
    )
    assert isinstance(User._meta.get_field(field).validators[1],
                   MaxLengthValidator), 'MaxLengthValidator is missing'


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'photo'],
                          ['blank', True],])
def test_photo_field(field_attr, value):
    field = 'photo'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


def test_photo_field_upload_to_attr():
    field = 'photo'
    assert User._meta.get_field(field).upload_to.__name__ == 'profile_photo', (
        f'User.{field}.upload_to should be profile_photo() function.'
    )


def test_user_model_login_field():
    username_field = 'email'
    assert User.USERNAME_FIELD == username_field, (
        'User.USERNAME_FIELD should be defined as '
        f'USERNAME_FIELD = {username_field}'
    )


def test_profile_photo_func():
    # Arrange
    user = User()
    user.id = 1
    filename = 'photo.png'
    # Act
    result = profile_photo(user, filename)
    # Assert
    assert result == 'profile-photo/1-USER.png', (
        'Incorrect path and filename from profile_photo() function'
    )


def test_phone_validator_func():
    correct_phone = '+7 (000) 000-00-00'
    try:
        phone_validator(correct_phone)
    except ValidationError:
        assert False, 'Phone number validation function works incorrectly'
