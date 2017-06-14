package io.pivotal.sporing.todos.todolist;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Matt Stine
 */
@RunWith(SpringRunner.class)
@DataJpaTest
public class TodoItemRepositoryTests {

    @Autowired
    TodoItemRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testCreate() {
        TodoList todoList = entityManager.find(TodoList.class, 1L);

        TodoItem todoItem = new TodoItem();
        todoItem.setName("buy milk");
        todoItem.setList(todoList);
        repository.save(todoItem);

        TodoItem loadedItem = repository.findOne(7L);
        assertThat(loadedItem.getName()).isEqualTo("buy milk");

        TodoList loadedTodoList = entityManager.find(TodoList.class, 1L);
        assertThat(loadedTodoList.getItems()).contains(loadedItem);
    }
}
