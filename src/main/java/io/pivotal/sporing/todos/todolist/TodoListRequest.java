package io.pivotal.sporing.todos.todolist;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Matt Stine
 */
@Data
@NoArgsConstructor
public class TodoListRequest {

    private String name;

    public TodoListRequest(String name) {
        this.name = name;
    }

}
