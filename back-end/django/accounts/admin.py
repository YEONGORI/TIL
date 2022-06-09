from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from accounts.models import UserAccount
# Register your models here.


class AccountAdmin(UserAdmin):
    ordering = ['id']
    list_display = ('email', 'username', 'first_name',
                    'last_name', 'date_joined', 'is_staff', 'is_admin')
    seacrh_fields = ('email', 'username')
    readonly_fields = ('id', 'date_joined')

    # filter_horizontal = ()
    # list_filter = ()
    # fieldsets = ()   이거 대신 models UserAccount에 PermissionsMixin 추가해쓰 원리는 나도모르겠네


admin.site.register(UserAccount, AccountAdmin)
