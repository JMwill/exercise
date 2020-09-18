#include <stdio.h>

int main(int argc, char const *argv[])
{
  int *ptr = NULL;

  printf("ptr 的地址是 %p\n", ptr);

  if (ptr) printf("ptr address pass condition\n");
  if (!ptr) printf("ptr address not pass condition\n");
  return 0;
}
