from django.contrib.auth.base_user import BaseUserManager


class UserAccountManager(BaseUserManager):
    # 로그인, 회원가입때 Email을 받기 위한 model manager (안해주면 username을 받아야함)
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("이메일이 필요합니다.")

        if not username:
            raise ValueError("닉네임이 필요합니다.")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),  # DB에서 중복을 줄이기 위함, 즉 소문자화 임
            username=username,
            password=password,
        )

        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True

        user.save(using=self._db)
        return user
