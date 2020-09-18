#include <stdio.h>

#define LENGTH 10
#define WIDTH 5
#define NEWLINE '\n'

int main(int argc, char const *argv[])
{
  int area;

  area = LENGTH * WIDTH;
  printf("value of area: %d", area);
  printf("%c", NEWLINE);
  return 0;
}
