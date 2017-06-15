package io.pivotal.sporing.todos.todolist;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.pivotal.sporing.todos.user.User;
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
@Table(name="todo_item")
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

    @OneToOne
    @JoinColumn(name = "OWNER_USER_ID")
    @JsonIgnore
    private User owner;

    public TodoItem(String name, TodoList list, User owner) {
        this.name = name;
        this.list = list;
        this.owner = owner;
    }

    public static TodoItem from(TodoItemRequest todoItemRequest, TodoList todoList) {
        return new TodoItem(todoItemRequest.getName(), todoList, todoList.getOwner());
    }

    public void merge(TodoItemRequest request) {
        this.name = request.getName();
        this.completed = request.isCompleted();
    }
}
