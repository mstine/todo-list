package io.pivotal.sporing.todos.todolist;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

/**
 * @author Matt Stine
 */
@Entity
@Data
@NoArgsConstructor
@ToString(exclude = {"list"})
public class TodoItem {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private boolean completed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TODO_LIST_ID")
    @JsonIgnore
    private TodoList list;

    public TodoItem(String name, TodoList list) {
        this.name = name;
        this.list = list;
    }

    public static TodoItem from(TodoItemRequest todoItemRequest, TodoList todoList) {
        return new TodoItem(todoItemRequest.getName(), todoList);
    }
}
