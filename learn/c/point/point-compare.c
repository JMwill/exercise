#include <stdio.h>

const int MAX = 3;
int main(int argc, char const *argv[])
{
  int var[] = {10, 100, 1000};
  int i, *ptr;

  ptr = var;

  while (ptr <= &var[MAX - 1])
  {
    printf("Address of var[%d] = %p\n", i, ptr);
    printf("Value of var[%d] = %d\n", i, *ptr);

    ptr++;
    i++;
  }

  return 0;
}
