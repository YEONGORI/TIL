#include <stdio.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>

void myhandler(int signo)
{
    switch (signo)
    {
    case SIGQUIT:
        printf("SIGQUIT(%d) is caught\n", SIGQUIT);
        break;
    case SIGTSTP:
        printf("SIGTSTP(%d) is caught\n", SIGTSTP);
        break;
    case SIGTERM:
        printf("SIGTERM(%d) is caught\n", SIGTERM);
        break;
    case SIGUSR1:
        printf("SIGUSR1(%d) is caught\n", SIGUSR1);
        break;
    default:
        printf("other signal\n");
    }
    return;
}

int main(void)
{
    signal(SIGQUIT, myhandler);
    signal(SIGTSTP, SIG_DFL);
    signal(SIGTERM, myhandler);
    signal(SIGUSR1, myhandler);

    for (;;)
        pause();
}