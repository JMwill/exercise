#include <stdio.h>

/* cat: 拼接文件名 */
int main(int argc, char *argv[]) {
    FILE *fp;
    void filecopy(FILE *, FILE *);
    if (argc == 1) // 没有参数，复制标准输入
        filecopy(stdin, stdout);
    else
        while(--argc > 0)
        if ((fp = fopen(*++argv, "r")) == NULL) {
            printf("cat: can't open %s\n", *argv);
            return 1;
        } else {
            filecopy(fp, stdout);
            fclose(fp);
        }
    return 0;
}

/* filecopy: 复制文件 ifp 到 文件 ofp 中 */
void filecopy(FILE *ifp, FILE *ofp) {
    int c;
    while ((c = getc(ifp)) != EOF)
        putc(c, ofp);
}