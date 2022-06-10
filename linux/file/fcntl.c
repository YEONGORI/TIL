#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
    if (argc != 2)
    {
        printf("Usage %s [file desciptor]\n", argv[0]);
        exit(0);
    }

    int val = fcntl(atoi(argv[1]), F_GETFL, 0);
    if (val < 0)
    {
        perror("failed fcntl");
        exit(0);
    }

    int accmode = val & O_ACCMODE;

    switch (accmode)
    {
    case O_RDONLY:
        printf("read only\n");
        break;
    case O_WRONLY:
        printf("write only\n");
        break;
    case O_RDWR:
        printf("read write\n");
        break;
    }
    return 0;
}