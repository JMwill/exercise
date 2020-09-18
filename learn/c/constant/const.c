#include <stdio.h>

int main(int argc, char const *argv[])
{
  const int LENGTH = 10;
  const int WIDTH = 5;
  const char NEWLINE = '\n';
  int area;

  area = LENGTH * WIDTH;
  printf("value of area: %d", area);
  printf("%c%c", NEWLINE);
  return 0;
}
