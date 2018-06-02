import edu.princeton.cs.algs4.*;
import java.lang.Math;

public class Shell {
  public static void sort(Comparable[] a) {
    int N = a.length;
    int k = calK(N);
    while (k > 0) {
      int region = calRegion(k);
      for (int i = region; i < N; i++) {
        for (int j = i; j >= region && less(a[j], a[j-region]); j -= region)
          exch(a, j, j-region);
      }
      k -= 1;
    }
  }

  // 官方实现
  // public static void sort(Comparable[] a) {
  //   int N = a.length;
  //   int h = 1;
  //   while (h < N/3) h = 3*h + 1;
  //   while (h >= 1) {
  //     for (int i = h; i < N; i++) { // 将 a[i] 插入到 a[i-h]，a[i-2*h] ... 中
  //       for (int j = i; j >= h && less(a[j], a[j-h]); j -= h) {
  //         exch(a, j, j-h);
  //       }
  //     }
  //     h = h/3;
  //   }
  // }

  private static int calRegion(int k) {
    return (int)(Math.pow(3, k) - 1) / 2;
  }

  private static int calK(int len) {
    int k = 1;
    int region = calRegion(k);
    while (len > region) {
      k += 1;
      region = calRegion(k);
    }
    return k - 1;
  }

  private static boolean less(Comparable v, Comparable w) {
    return v.compareTo(w) < 0;
  }

  private static void exch(Comparable[] a, int i, int j) {
    Comparable t = a[i]; a[i] = a[j]; a[j] = t;
  }

  private static void show(Comparable[] a) {
    for (int i = 0; i < a.length; i++)
      StdOut.print(a[i] + " ");
    StdOut.println();
  }

  public static boolean isSorted(Comparable[] a) {
    for (int i = 1; i < a.length; i++)
      if (less(a[i], a[i - 1]))
        return false;
    return true;
  }

  public static void main(String[] args) {
    String[] a = In.readStrings();
    sort(a);
    assert isSorted(a);
    show(a);
  }
}