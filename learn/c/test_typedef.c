#define MaxSize 50

#include <stdio.h>
typedef struct DNode {
  char data;
  int next;
} SLinkList[MaxSize];

int main() {
  SLinkList p;
  printf("hello: %p", &p);
  return 0;
}
