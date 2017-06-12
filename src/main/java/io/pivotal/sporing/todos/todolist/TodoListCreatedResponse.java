package io.pivotal.sporing.todos.todolist;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Matt Stine
 */
@Data
@NoArgsConstructor
public class TodoListCreatedResponse {
    private String id;
    private String name;
    private List<TodoItem> items = new ArrayList<>();

    public TodoListCreatedResponse(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public static TodoListCreatedResponse from(TodoList todoList) {
        return new TodoListCreatedResponse(todoList.getId().toString(), todoList.getName());
    }
}
