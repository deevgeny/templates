"""
API version 1 available urls.
"""

# API prefix and version identifiers
PREFIX = '/api'
VERSION = '/v1'

# Authorization endpoints
TOKEN_OBTAIN = f'{PREFIX}{VERSION}/auth/token/obtain'
TOKEN_REFRESH = f'{PREFIX}{VERSION}/auth/token/refresh'
TOKEN_VERIFY = f'{PREFIX}{VERSION}/auth/token/verify'

# Users endpoints
REGISTER = f'{PREFIX}{VERSION}/users'
PROFILE = f'{PREFIX}{VERSION}/users/me'
CHANGE_PASSWORD = f'{PREFIX}{VERSION}/users/change-password'
