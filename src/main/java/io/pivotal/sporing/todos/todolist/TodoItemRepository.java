package io.pivotal.sporing.todos.todolist;

import org.springframework.data.repository.CrudRepository;

/**
 * @author Matt Stine
 */
public interface TodoItemRepository extends CrudRepository<TodoItem, Long> {
}
