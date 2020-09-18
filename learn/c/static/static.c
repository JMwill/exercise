#include <stdio.h>

void func1(void);

static int count = 10;

int main(int argc, char const *argv[])
{
  while (count--) {
    func1();
  }
  return 0;
}

void func1(void) {
  // 只初始化一次，每次调用函数 'func1' 时，'thingy' 不会被重置
  static int thingy = 5;
  thingy++;
  printf("thingy 为 %d，count 为：%d \n", thingy, count);
}
