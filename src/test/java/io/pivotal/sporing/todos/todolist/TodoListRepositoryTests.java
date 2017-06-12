package io.pivotal.sporing.todos.todolist;

import io.pivotal.sporing.todos.user.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNull;

/**
 * @author Matt Stine
 */
@RunWith(SpringRunner.class)
@DataJpaTest
public class TodoListRepositoryTests {

    @Autowired
    private TodoListRepository repository;

    @Autowired
    private TestEntityManager entityManager;
    private User owner;

    @Before
    public void setUp() throws Exception {
        owner = entityManager.find(User.class, 1L);
    }

    @Test
    public void testCreate() {
        TodoList chores = new TodoList("chores", owner);
        repository.save(chores);

        TodoList loadedChores = repository.findOne(3L);
        assertThat(loadedChores.getItems()).isEmpty();
        assertThat(loadedChores.getName()).isEqualTo("chores");
        assertThat(loadedChores.getOwner()).isEqualTo(owner);
    }

    @Test
    public void testGet() {
        TodoList todoList = repository.findOneByIdAndOwner(1L, owner);

        assertThat(todoList.getName()).isEqualTo("Test List 1");
    }

    @Test
    public void testList() {
        List<TodoList> lists = repository.findAllByOwner(owner);
        assertThat(lists.size()).isEqualTo(2);
    }

    @Test
    public void testDelete() {
        repository.deleteByIdAndOwner(1L, owner);
        assertNull(repository.findOne(1L));
    }
}
