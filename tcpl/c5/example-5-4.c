#define ALLOCSIZE 10000
static char allocbuf[ALLOCSIZE]; // 申请存储数组
static char *allocp = allocbuf; // 数组名就是第一个元素的地址，所以直接赋值

char *alloc(int n) { // 返回的是一个指向存储起始位置的指针
    if (allocbuf + ALLOCSIZE - allocp >= n) {
        allocp += n;
        return allocp - n; // 返回的是外部获取指针位置的函数使用数组位置的起始位置
    } else {
        return 0;
    }
}

void afree(char *p) {
    if (p >= allocbuf && p < allocbuf + ALLOCSIZE) // 检验范围，大于等于数组起始位置，小于数组最大长度
        allocp = p;
}
