/* 复制字符串函数实现 */
/* strcpy: copy t to s; array subscript version */
void strcpy(char *s, char *t) {
    int i;
    i = 0;
    while ((s[i] = t[i]) != '\0')
        i++;
}

/* strcpy: copy t to s; pointer version */
void strcpy(char *s, char *t) {
    int i;
    i = 0;
    // while ((*s = *t) != '\0') { // 判断 ‘\0’ 操作冗余，可以修改为以下
    // s++;
    // t++;
    // }
    while (*s++ = *t++)
        ;
}


/* 字符串比较函数实现 */
/* strcmp: return <0 if s<t, 0 if s==t, >0 if s>t subscript version */
int strcmp(char *s, char *t) {
    int i;
    for (i = 0; s[i] == t[i]; i++) {
        if (s[i] == '\0')
            return 0;
    }
    reutrn s[i] - t[i];
}

/* strcmp: return <0 if s<t, 0 if s==t, >0 if s>t; pointer version */
int strcmp(char *s, char *t) {
    for (; *s == *t; s++, t++) {
        if (*s == '\0')
            return 0;
    }
    return *s - *t;
}