package io.pivotal.sporing.todos.todolist;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.tools.javac.comp.Todo;
import io.pivotal.sporing.todos.TestWebSecurityConfig;
import io.pivotal.sporing.todos.user.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.samePropertyValuesAs;
import static org.mockito.Matchers.argThat;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author Matt Stine
 */
@RunWith(SpringRunner.class)
@WebMvcTest
@Import(TestWebSecurityConfig.class)
@ActiveProfiles("test")
public class TodoListControllerTests {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private TodoListRepository repository;

    @Test
    @WithUserDetails("matt.stine@gmail.com")
    public void testCreate() throws Exception {
        String requestBody = mapper.writeValueAsString(
                new TodoListRequest("chores"));

        TodoListCreatedResponse response = new TodoListCreatedResponse("1", "chores");

        TodoList todoList = new TodoList("chores", new User());
        todoList.setId(1L);

        when(repository.save(any(TodoList.class))).thenReturn(todoList);

        mvc.perform(post("/lists")
                .content(requestBody)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().json(mapper.writeValueAsString(response)));

        verify(repository).save(any(TodoList.class));
    }

    @Test
    @WithUserDetails("matt.stine@gmail.com")
    public void testList() throws Exception {
        List<TodoList> results = Arrays.asList(new TodoList("chores", null), new TodoList("errands", null));
        when(repository.findAllByOwner(any(User.class))).thenReturn(results);

        mvc.perform(get("/lists")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(mapper.writeValueAsString(results)))
                .andDo(print());
    }

    @Test
    @WithUserDetails("matt.stine@gmail.com")
    public void testGet() throws Exception {
        User owner = new User();
        TodoList todoList = new TodoList("chores", owner);
        when(repository.findOneByIdAndOwner(eq(1L), any(User.class))).thenReturn(todoList);

        mvc.perform(get("/lists/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(mapper.writeValueAsString(todoList)))
                .andDo(print());
    }

    @Test
    @WithUserDetails("matt.stine@gmail.com")
    public void testDelete() throws Exception {
        mvc.perform(delete("/lists/{id}", 1L))
                .andExpect(status().isNoContent())
                .andDo(print());

        verify(repository).deleteByIdAndOwner(eq(1L), any(User.class));
    }

    @Test
    @WithUserDetails("matt.stine@gmail.com")
    public void testUpdate() throws Exception {
        User owner = new User();
        TodoList todoList = new TodoList("chores", owner);
        when(repository.findOneByIdAndOwner(eq(1L), any(User.class))).thenReturn(todoList);

        TodoListRequest request = new TodoListRequest("Chores");
        String requestBody = mapper.writeValueAsString(
                request);

        mvc.perform(put("/lists/{id}", 1L)
                .content(requestBody)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        TodoList updatedTodoList = TodoList.from(request, owner);
        verify(repository).save(argThat(samePropertyValuesAs(updatedTodoList)));
    }
}
