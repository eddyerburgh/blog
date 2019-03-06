public class LinkedList<E> {
     transient int size = 0;
     transient Node<E> first;
     transient Node<E> last;

     public LinkedList() {}

     void linkLast(E e) {
         final Node<E> l = last;
         final Node<E> newNode = new Node<>(l, e, null);
         last = newNode;
         if (l == null)
             first = newNode;
         else
             l.next = newNode;
         size++;
     }

    private E unlinkLast(Node<E> l) {
         final E element = l.item;
         final Node<E> prev = l.prev;
         l.item = null;
         l.prev = null; // help GC
         last = prev;
         if (prev == null)
             first = null;
         else
             prev.next = null;
         size--;
         return element;
     }

     public E getLast() {
         final Node<E> l = last;
         if (l == null)
             throw new RuntimeException();
         return l.item;
     }

     public E removeLast() {
         final Node<E> l = last;
         if (l == null)
             throw new RuntimeException();
         return unlinkLast(l);
     }

     public boolean add(E e) {
         linkLast(e);
         return true;
     }

     // ..

     private static class Node<E> {
         E item;
         Node<E> next;
         Node<E> prev;

         Node(Node<E> prev, E element, Node<E> next) {
             this.item = element;
             this.next = next;
             this.prev = prev;
         }
     }

     public static void main(String[] args) {
      LinkedList<String> list = new LinkedList<>();

      list.add("a");
      System.out.println(list.getLast());
      list.add("b");
      System.out.println(list.getLast());
      list.add("c");
      System.out.println(list.getLast());
      list.removeLast();
      System.out.println(list.getLast());
      list.removeLast();
      System.out.println(list.getLast());
      return;
     }
  }

// LinkedList<String> list = new LinkedList<>();

// list.add("a");
// list.add("b");
// list.getLast(); // "b"
// list.removeLast();
// list.getLast(); // "a"
