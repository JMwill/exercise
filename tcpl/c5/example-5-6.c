#include <stdio.h>
#include <string.h>

#define MAXLINES 5000 // 最大的用于比较的行数

char *lineptr[MAXLINES]; // 指向文本行的指针

int readlines(char *lineptr[], int nlines);
void writelines(char *lineptr[], int nlines);
void qsort(char *lineptr[], int left, int right);

/* 排序输入行 */
int main() {
    int nlines; // 读取的输入行的号码
    if ((nlines > readlines(lineptr, MAXLINES)) >= 0) {
        qsort(lineptr, 0, nlines - 1);
        writelines(lineptr, nlines);
        return 0;
    } else {
        printf("error, input too big to sort\n");
        return 1;
    }
}

#define MAXLEN 1000 // 任何输入行的最大长度
int getline(char *, int);
char *alloc(int);

/* readlines: read inputs lines */
int readlines(char *lineptr[], int maxlines) {
    int len, nlines;
    char *p, line[MAXLEN];

    nlines = 0;
    while ((len = getline(line, MAXLEN)) > 0) {
        if (nlines >= maxlines || p = alloc(len) == NULL) {
            return -1;
        } else {
            line[len - 1] = '\0'; // 删除新行
            strcpy(p, line);
            lineptr[nlines++] = p;
        }
    }
    return nlines;
}

/* writelines: 输出流中输出行 */
/* void writelines(char *lineptr[], int nlines) { */
/*     int i; */
/*     for (i = 0; i < nlines; i++) { */
/*         printf("%s\n", lineptr[i]); */
/*     } */
/* } */
/* writelines 改进版本 */
void writelines(char *lineptr[], int nlines) {
    while (nlines-- > 0) {
        printf("%s\n", *lineptr++); // 这里的数组变量 lineptr 可以改变值，因为它是一个指针
    }
}

/* qsort: sort v[left]...v[right] into increasing order */
void qsort(char *v[], int left, int right) {
    int i, last;
    void swap(char *v[], int i, int j);

    if (left >= right) // 少于两个元素不用做任何事情
        return;
    swap(v, left, (left + right)/2);
    last = left;
    for (i = left+1; i <= right; i++) {
        if (strcmp(v[i], v[left]) < 0) {
            swap(v, ++last, i);
        }
    }
    swap(v, left, last);
    qsort(v, left, last-1);
    qsort(v, last+1, right);
}

/* swap: v[i]、v[j] 互换 */
void swap(char *v[], int i, int j) {
    char *temp;
    temp = v[i];
    v[i] = v[j];
    v[j] = temp;
}

