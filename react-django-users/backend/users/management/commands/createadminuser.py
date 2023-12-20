import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

User = get_user_model()


class Command(BaseCommand):
    """Custom command to create admin user."""

    def handle(self, *args, **options):
        if not (os.getenv('ADMIN_EMAIL') and os.getenv('ADMIN_FIRST_NAME')
                and os.getenv('ADMIN_LAST_NAME')
                and os.getenv('ADMIN_PASSWORD')):
            self.style.WARNING('WARNING: No credentials for admin user')
            return

        try:
            User.objects.create_superuser(
                email=os.getenv('ADMIN_EMAIL'),
                first_name=os.getenv('ADMIN_FIRST_NAME'),
                last_name=os.getenv('ADMIN_LAST_NAME'),
                password=os.getenv('ADMIN_PASSWORD')
            )
            self.stdout.write(
                self.style.SUCCESS("SUCCESS: Admin user created.")
            )
        except IntegrityError:
            self.stdout.write(
                self.style.ERROR("ERROR: Admin user already exists.")
            )

        # except BaseException:
        #    self.stdout.write(
        #        self.style.ERROR("ERROR: Unexpected error.")
        #    )
