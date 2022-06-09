#include <sys/types.h>
#include <sys/socket.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define PORT 5555

int main(void)
{
    int client_sd;
    char buf[256];
    struct sockaddr_in server;

    if ((client_sd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
    {
        perror("socket");
        exit(1);
    }

    memset((char *)&server, 0, sizeof(server));
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = inet_addr("127.0.0.1");
    server.sin_port = htons(PORT);

    if (connect(client_sd, (struct sockaddr *)&server, sizeof(server)))
    {
        perror("connect");
        exit(1);
    }

    if (recv(client_sd, buf, sizeof(buf), 0) < 0)
    {
        perror("recv");
        exit(1);
    }

    close(client_sd);
    printf("From Server: %s\n", buf);

    return 0;
}