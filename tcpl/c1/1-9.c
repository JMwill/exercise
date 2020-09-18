#include <stdio.h>
int main() {
    long c, pc;
    while ((c = getchar()) != EOF) {
        if (c == ' ') { ; }
        else if (c != ' ' && pc == ' ') {
            putchar(pc);
            putchar(c);
        }
        else { putchar(c); }
        pc = c;
    }
}