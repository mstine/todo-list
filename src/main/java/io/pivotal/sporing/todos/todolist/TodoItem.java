package io.pivotal.sporing.todos.todolist;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @author Matt Stine
 */
@Entity
@Data
@NoArgsConstructor
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

}
