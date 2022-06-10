#include <stdio.h>
#include <sys/ipc.h>
#include <sys/sem.h>
#include <unistd.h>
#include <stdlib.h>

int p(int semid)
{
    struct sembuf vbuf;

    vbuf.sem_num = 0;
    vbuf.sem_op = -1;
    vbuf.sem_flg = SEM_UNDO;

    if (semop(semid, &vbuf, 1) == -1)
    {
        printf("p() operation is failed\n");
        return 0;
    }
    else
        return 1;
}

int v(int semid)
{
    struct sembuf vbuf;

    vbuf.sem_num = 0;
    vbuf.sem_op = 1;
    vbuf.sem_flg = SEM_UNDO;

    if (semop(semid, &vbuf, 1) == -1)
    {
        printf("v() operation is failed\n");
        return 0;
    }
    else
        return 1;
}

int initsem(key_t skey)
{
    int status = 0, semid;

    if ((semid = semget(skey, 1, IPC_CREAT | IPC_EXCL | 0666)) == -1)
        ;
    else
        status = semctl(semid, 0, SETVAL, 1);

    if (semid == -1 || status == -1)
    {
        printf("initsem is failed\n");
        exit(1);
    }
    else
        return semid;
}

void handlesem(key_t skey)
{
    int semid, pid = getpid();

    if ((semid = initsem(skey)) < 0)
        exit(1);

    printf("\nprocess %d before critical section\n", pid);
    p(semid);
    printf("\nprocess %d is in the critical section\n", pid);
    sleep(5);
    printf("\nprocess %d is leaving critical section\n", pid);
    v(semid);

    printf("\nprocess %d is exiting\n", pid);
    exit(0);
}

int main(void)
{
    key_t semkey = 0x200;

    if (fork() == 0)
        handlesem(semkey);

    if (fork() == 0)
        handlesem(semkey);

    if (fork() == 0)
        handlesem(semkey);
}