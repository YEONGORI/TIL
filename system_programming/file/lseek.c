#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

char buf1[] = "abcdefghij";
char buf2[] = "ABDCEFGHIJ";

int main(void)
{
    int fd;

    if ((fd = creat("file.hole", 644)) < 0)
    {
        printf("create error");
        exit(1);
    }

    if (write(fd, buf1, 10) != 10)
    {
        printf("write error");
        exit(1);
    } // 현재 offset 10

    if (lseek(fd, 16384, SEEK_SET) == -1)
    {
        printf("lseek error");
        exit(1);
    } // 현재 offset 16384

    if (write(fd, buf2, 10) != 10)
    {
        printf("buf2 write error");
        exit(1);
    } // 현재 offset 16384

    exit(0);
}