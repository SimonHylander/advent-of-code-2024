/**
 * https://www.geeksforgeeks.org/m-way-search-trees-set-1-searching/
The m-way search trees are multi-way trees which are generalised versions of binary trees where each node contains multiple elements.
In an m-Way tree of order m, each node contains a maximum of m – 1 elements and m children.
The goal of m-Way search tree of height h calls for O(h) no.
of accesses for an insert/delete/retrieval operation. Hence, it ensures that the height h is close to log_m(n + 1).
The number of elements in an m-Way search tree of height h ranges from a minimum of h to a maximum of m^{h} -1.
An m-Way search tree of n elements ranges from a minimum height of log_m(n+1) to a maximum of n
An example of a 5-Way search tree is shown in the figure below. 
Observe how each node has at most 5 child nodes & therefore has at most 4 keys contained in it. 
 */
