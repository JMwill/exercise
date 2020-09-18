/* 递归下降语法分析树 */
/* dcl: 解析声明符 */
void dcl(void) {
    int ns;
    for (ns = 0; gettoken() == '*';) // 统计 * 数量
        ns++;
    dirdcl();
    while (ns-- > 0)
    strcat(out, " pointer to");
}

/* dirdcl: 解析直接声明符 */
void dirdcl(void) {
    int type;
    if (tokentype == '(') { // ( dcl )
        dcl();
        if (tokentype != ')')
            printf("error: missing )\n");
    } else if (tokentype == NAME) // 变量名称
        strcpy(name, token);
    else
        printf("error: expected name or (dcl)\n");
    while ((type = gettoken()) == PARENS || type == BRACKETS)
        if (type == parens)
            strcat(out, " function returning");
        else {
            strcat(out, " array");
            strcat(out, token);
            strcat(out, " of");
        }
}

int gettoken(void) { // 返回下一个 token
    int c, getch(void);
    void ungetch(int);
    char *p = token;

    while ((c = getch()) == ' ' || c == '\t')
        ;
    if (c == '(') {
        if ((c = getch()) == ')') {
            strcpy(token, "()");
            return tokentype = PARENS;
        } else {
            ungetch(c);
            return tokentype = '(';
        }
    } else if (c == '[') {
        for (*p++ = c; (*p++ = getch()) != ']';)
            ;
        *p = '\0';
        return tokentype = BRACKETS;
    } else if (isalpha(c)) {
        for (*p++ = c; isalnum(c = getch()); )
            *p++ = c;
        *p = '\0';
        ungetch(c);
        return tokentype = NAME;
    } else
        return tokentype = c;
}

#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAXTOKEN 100

enum {NAME, PARENS, BRACKETS};
void dcl(void);
void dirdcl(void);

int gettoken(void);
int tokentype; // 最近一次的 token 类型
char token[MAXTOKEN]; // 最近一次的 token 字符串
char name[MAXTOKEN]; // 标识符名字
char datatype[MAXTOKEN]; // 数据类型 = char, int, 等等
char out[1000];

int main() { // 将声明转化为文字
    while (gettoken() != EOF) { // 每行的第一个 token
        strcpy(datatype, token); // 是特定的数据类型
        out[0] = '\0';
        dcl(); // 解析剩下的行
        if (tokentype != '\n')
            printf(" syntax error\n");
        printf("%s: %s %s\n", name, out, datatype);
    }
    return 0;
}