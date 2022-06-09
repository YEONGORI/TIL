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
    char buf[256];
    struct sockaddr_in server, client;
    int serv_sd, client_sd, client_len = sizeof(client);

    if ((serv_sd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
    {
        perror("socket");
        exit(1);
    }
    memset((char *)&server, 0, sizeof(server));
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = inet_addr("127.0.0.1");
    server.sin_port = htons(PORT);

    if (bind(serv_sd, (struct sockaddr *)&server, sizeof(server)))
    {
        perror("bind");
        exit(1);
    }

    if (listen(serv_sd, 5))
    {
        perror("listen");
        exit(1);
    }

    if ((client_sd = accept(serv_sd, (struct sockaddr *)&client, &client_len)) < 0)
    {
        perror("accept");
        exit(1);
    }

    sprintf(buf, "Your IP address is %s", inet_ntoa(client.sin_addr));
    if (write(client_sd, buf, strlen(buf) + 1) < 0)
    {
        perror("send");
        exit(1);
    }
    close(client_sd);
    close(serv_sd);

    return 0;
}