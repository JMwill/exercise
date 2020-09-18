// 以每行一个单词的形式打印输入内容
#include <stdio.h>
#define IN 1
#define OUT 0

int main() {
    long c, state;
    state = OUT;
    while (((c = getchar()) != EOF)) {
        if (c == ' ' || c == '\t')
            state = OUT;
        else if (state == OUT) {
            state = IN;
            putchar('\n');
            putchar(c);
        } else {
            putchar(c);
        }
    }
}