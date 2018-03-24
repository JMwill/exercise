import edu.princeton.cs.algs4.*;

public class Selection {
  // ========== 个人实现 ==========
  private static int minIndex(Comparable[] a, int start) {
    if (a.length == 0) { return -1; }

    int index = start;
    for (int i = start + 1; i < a.length; i++) {
      if (a[i].compareTo(a[index]) < 0) {
        index = i;
      }
    }
    return index;
  }

  // public static void sort(Comparable[] a) {
  //   for (int i = 0; i < a.length - 1; i++) {
  //     int index = minIndex(a, i);
  //     exch(a, i, index);
  //   }
  // }
  // ========== 个人实现 ==========

  // ========== 官方实现 ==========
  public static void sort(Comparable[] a) {
    int N = a.length;
    for (int i = 0; i < N; i++) {
      int min = i;
      for (int j = i + 1; j < N; j++)
        if (less(a[j], a[min])) min = j;
      exch(a, i, min);
    }
  }
  // ========== 官方实现 ==========

  private static void exch(Comparable[] a, int i, int j) {
    Comparable t = a[i]; a[i] = a[j]; a[j] = t;
  }

  private static boolean less(Comparable v, Comparable w) {
    return v.compareTo(w) < 0;
  }

  public static boolean isSorted(Comparable[] a) {
    for (int i = 1; i < a.length; i++)
      if (less(a[i], a[i - 1]))
        return false;
    return true;
  }

  private static void show (Comparable[] a) {
    for (int i = 0; i < a.length; i++)
      StdOut.print(a[i] + " ");
    StdOut.println();
  }

  public static void main(String[] args) {
    String[] a = In.readStrings();
    sort(a);
    assert isSorted(a);
    show(a);
  }
}