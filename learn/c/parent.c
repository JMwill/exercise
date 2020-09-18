#define MAX_TREE_SIZE 100
typedef struct {
  ElemType data;
  int parent;
} PTNode;

typedef struct {
  PTNode nodes[MAX_TREE_SIZE];
  int n;
} PTree;
