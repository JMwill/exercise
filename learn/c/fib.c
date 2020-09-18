#include <stdio.h>

int fib(int n) {
  if (n == 0)
    return 0;
  else if (n == 1)
    return 1;
  else
    return fib(n - 1) + fib(n - 2);
}

int main(int argc, char* argv[]) {
  int num, total;
  printf("Program Name is: %s\n", argv[0]);
  scanf("%d", &num);
  total = fib(num);
  printf("Fib total is: %d\n", total);
  return 0;
}
