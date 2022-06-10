#include <sys/types.h>
#include <sys/wait.h>
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

static void sig_int(int);

int main(void)
{
    char buf[255];
    pid_t pid;
    int status;

    if (signal(SIGINT, sig_int) == SIG_ERR)
        fprintf(stderr, "signal error");

    printf("%%");
    while (strcmp(fgets(buf, 255, stdin), "q\n"))
    {
        buf[strlen(buf) - 1] = 0;
        if ((pid = fork()) < 0)
            fprintf(stderr, "fork error");
        else if (pid == 0)
        {
            printf("%s\n", buf);
            sleep(3);
            exit(0);
        }

        if ((pid = waitpid(pid, &status, 0)) < 0)
            fprintf(stderr, "waitpid error\n");
        printf("%%");
    }
    exit(0);
}

void sig_int(int signo)
{
    printf("interrupt\n");
}