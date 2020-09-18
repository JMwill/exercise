
#include <stdio.h>

// 两个外部变量
int x = 1;
int y = 2;

int addTwoNum();
int main(int argc, char const *argv[])
{
  int result;
  // 调用 addTwoNum
  result = addTwoNum();
  printf("result 为：%d \n", result);
  return 0;
}