from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """Register custom user model on admin site."""
    fieldsets = (
        (None, {"fields": ("password",)}),
        (_("Personal info"),
         {"fields": ("first_name", "last_name", "email", "role",
                     "phone", "photo")}),
        (_("Permissions"),
         {"fields": ("is_active", "is_staff", "is_superuser", "groups",
                     "user_permissions")}),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (None, {"classes": ("wide",),
                "fields": ("last_name", "first_name", "password1",
                           "password2", "email")}),
    )
    list_display = ("id", "last_name", "first_name", "email",
                    "is_active", "is_staff", "is_superuser")
    list_display_links = ("id", "last_name",)
    list_filter = ("is_staff", "is_active", "is_superuser")
    ordering = ('email', )
