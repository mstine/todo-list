package io.pivotal.sporing.todos.todolist;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.pivotal.sporing.todos.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Matt Stine
 */
@Entity
@Data
@NoArgsConstructor
public class TodoList {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @OneToMany(mappedBy = "list",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private List<TodoItem> items = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "OWNER_USER_ID")
    @JsonIgnore
    private User owner;

    public TodoList(String name, User owner) {
        this.name = name;
        this.owner = owner;
    }

    public static TodoList from(TodoListRequest todoListRequest, User user) {
        return new TodoList(todoListRequest.getName(), user);
    }

    public void merge(TodoListRequest request) {
        setName(request.getName());
    }
}
