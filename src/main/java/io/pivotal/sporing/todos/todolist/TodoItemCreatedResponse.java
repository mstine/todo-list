package io.pivotal.sporing.todos.todolist;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Matt Stine
 */
@Data
@NoArgsConstructor
public class TodoItemCreatedResponse {
    private String id;
    private String name;

    public TodoItemCreatedResponse(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public static TodoItemCreatedResponse from(TodoItem todoItem) {
        return new TodoItemCreatedResponse(todoItem.getId().toString(), todoItem.getName());
    }
}
