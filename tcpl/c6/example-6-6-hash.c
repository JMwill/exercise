struct nlist {
    struct nlist *next; // 下一个链表后继块的指针
    char *name; // 名称指针
    char *defn; // 指向替换文本的指针
};

#define HASHSIZE 101
static struct nlist *hashtab[HASHSIZE]; // 指针表格

/* 从字符串中构建出 hash 值 */
unsigned hash(char *s) {
    unsigned hashval;
    for (hashval = 0; *s != '\0'; s++)
        hashval = *s + 31 * hashval;
    return hashval % HASHSIZE
}

/* lookup: 在 hashtab 中查找 */
struct nlist *lookup(char *s) {
    struct nlist *np;
    for (np = hashtab[hash(s)]; np != NULL; np = np->next)
        if (strcmp(s, np->name) == 0)
            return np; // 找到
    return NULL; // 没找到
}

struct nlist *lookup(char *);
char *strdup(char *);

/* install: 将 (name, defn) 插入到 hashtab 中 */
struct nlist *install(char *name, char *defn) {
    struct nlist *np;
    unsigned hashval;

    if ((np = lookup(name)) == NULL) {
        np = (struct nlist *) malloc(sizeof (*np));
        if (np == NULL || (np->name = strdup(name)) == NULL)
            return NULL;
        hashval = hash(name);
        np->next = hashtab[hashval];
        hashtab[hashval] = np;
    } else // 已经存在
        free((void *) np->defn); // 释放前面的 defn
    if ((np->defn = strdup(defn)) == NULL)
        return NULL;
    return np;
}