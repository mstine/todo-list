package io.pivotal.sporing.todos.todolist;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Matt Stine
 */
@Data
@NoArgsConstructor
public class TodoItemRequest {

    private String name;

    public TodoItemRequest(String name) {
        this.name = name;
    }
}
