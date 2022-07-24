#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int *ptr = NULL;

    ptr = (int *)malloc(sizeof(int) * 1);
    printf("addr 1: %p\n", ptr);

    free(ptr);
    printf("addr 2: %p\n", ptr);

    ptr = NULL;
    printf("addr 3: %p\n", ptr);
}