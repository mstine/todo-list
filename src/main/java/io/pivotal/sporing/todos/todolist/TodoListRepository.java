package io.pivotal.sporing.todos.todolist;

import io.pivotal.sporing.todos.user.User;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author Matt Stine
 */
public interface TodoListRepository extends CrudRepository<TodoList, Long> {
    List<TodoList> findAllByOwner(User owner);

    TodoList findOneByIdAndOwner(Long id, User owner);

    @Transactional
    void deleteByIdAndOwner(Long id, User owner);
}
