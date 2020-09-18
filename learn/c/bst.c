BSTNode *BST_Search(BiTree T, ElemType key, BSTNode *&p) {
  p = NULL;
  while (T != NULL && key != T->data) {
    p = T;
    if (key < T->data)
      T = T->lchild;
    else
      T = T->rchild;
  }
  return T;
}

int BST_Insert(BiTree &T, KeyType k) {
  if (T == NULL) {
    T = (BiTree)malloc(sizeof (BSTNode));
    T->key = k;
    T->lchild = T->rchild = NULL;
    return 1;
  }
  else if (k == T->key)
    return 0;
  else if (k < T->key)
    return BST_Search(T->lchild, k);
  else
    return BST_Search(T->rchild, k);
}
