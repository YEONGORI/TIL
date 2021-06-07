from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from .managers import UserAccountManager


class UserAccount(AbstractBaseUser, PermissionsMixin):
    # AbstractBaseUser를 상속받아 사용해서 password 컬럼을 안만들어두댐!
    email = models.EmailField(verbose_name='email',
                              max_length=100, unique=True)
    username = models.CharField(max_length=30)
    # default value들 중에 username이 있어서 닉네임대신 썻어 이게 닉네임이라 보면 됨
    first_name = None
    last_name = None
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserAccountManager()  # 여기서 만든 클래스를 사용하기위한 설정

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username  # email로 하면 다르 사용자한테 보임

    def has_perm(self, perm, obj=None):
        # user가 admin의 permission을 갖고 있는지 묻는 함수 is_admin == admin이면 permission을 갖음
        return self.is_admin

    def has_module_perms(self, app_label):
        # 모든 user가 자신의 module에 접근가능하게함
        return True
