import edu.princeton.cs.algs4.*;
/**
 * Cat
 */
public class Cat {

  public static void main(String[] args) {
    Out out = new Out(args[args.length - 1]);
    for (int i = 0; i < args.length - 1; i++) {
      // 将第 i 个文件复制到输出流钟
      In in = new In(args[i]);
      String s = in.readAll();
      out.println(s);
      in.close();
    }
    out.close();
  }
}