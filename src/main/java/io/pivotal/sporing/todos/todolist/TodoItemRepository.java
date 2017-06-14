package io.pivotal.sporing.todos.todolist;

import io.pivotal.sporing.todos.user.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * @author Matt Stine
 */
public interface TodoItemRepository extends CrudRepository<TodoItem, Long> {
    TodoItem findOneByIdAndListAndOwner(Long id, TodoList todoList, User owner);

    @Transactional
    void deleteByIdAndListAndOwner(Long id, TodoList todoList, User owner);
}
