#include <stdio.h>

struct ListNode {
  struct ListNode* next;
  int val;
};

struct ListNode* tail;
struct ListNode* head;

struct ListNode* find(data) {
  struct ListNode* node = head;
  while(node) {
    if(node -> data == data) {
      return node;
    }
    node = node -> next;
  }
  return node;
}

struct ListNode* create_node(int val) {
  struct ListNode* node;
  node = malloc(sizeof(struct ListNode));
  node -> val = val;
  node -> next = NULL;
  return node;
}

void add(val) {
  struct ListNode* node = create_node(val);
  printf("tail val %d", tail-> val);
  tail -> next = node;
  tail = node;
}

void traverse() {
  struct ListNode* node = head;
  while(node) {
    printf("traverse %d \n", node -> val);
    node = node -> next;
  }
}
// head    tail
// 1 -> 2 -> 3 -> NULL

void main() {
  struct ListNode* node = create_node(1);
  head = node;
  tail = node;
  add(2);
  add(3);
  add(4);
  add(5);
  traverse();
  struct ListNode* n = find(5);
  printf("found %d", n -> val);
}
