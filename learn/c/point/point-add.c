#include <stdio.h>

const int MAX = 3;
int main(int argc, char const *argv[])
{
  int var[] = {10, 100, 1000};
  int i, *ptr;

  ptr = var;
  for (i = 0; i < MAX; i++)
  {
    printf("存储地址：var[%d] = %p\n", i, ptr);
    printf("存储地址：var[%d] = %d\n", i, *ptr);

    ptr++;
  }

  return 0;
}
