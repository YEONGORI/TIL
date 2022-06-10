#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>

void *thr_fn(void *buf)
{
    printf("thread[%s] is created.\n", (char *)buf);
}

int main(void)
{
    char buf[255];
    int status;
    int err;
    void *tret;

    pthread_t tid;

    printf("%% ");
    while (fgets(buf, 255, stdin) != NULL)
    {
        buf[strlen(buf) - 1] = 0;
        err = pthread_create(&tid, NULL, thr_fn, (void *)buf);

        if (err != 0)
        {
            printf("pthread_create() error.\n");
            return 0;
        }

        pthread_join(tid, &tret);

        printf("%% ");
    }
    return 0;
}