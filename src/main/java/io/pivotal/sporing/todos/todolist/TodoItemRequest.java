package io.pivotal.sporing.todos.todolist;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Matt Stine
 */
@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TodoItemRequest {

    private boolean completed;
    private String name;

    public TodoItemRequest(String name) {
        this.name = name;
    }
}
