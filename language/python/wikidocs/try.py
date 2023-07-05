try:
    4/0
except ZeroDivisionError as e:
    print(e)

try:
    f = open("test.txt", 'w')
finally:
    f.close()

try:
    a = [1, 2]
    print(a[3])
    4/0
except ZeroDivisionError:
    print("0으로 나눌 수 없다.")
except IndexError:
    print("인덱싱 할 수 없다.")

try:
    a = [1, 2]
    print(a[3])
    4/0
except (ZeroDivisionError, IndexError) as e:
    print(e)

try:
    pass
except :
    pass
else:
    pass

class Bird:
    def fly(self):
        raise NotImplementedError
    
class Eagle(Bird):
    def fly(self):
        print("very fast")

eagle = Eagle()
eagle.fly()

class MyError(Exception):
    def __str__(self):
        return "허용되지 않는 별명입니다."

def say_nick(nick):
    if nick == '바보':
        raise MyError()
    print(nick)

try:
    say_nick("닉")
    say_nick("바보")
except MyError:
    print("허용되지 않는 별명입니다.")

try:
    say_nick("닉")
    say_nick("바보")
except MyError as e:
    print(e)