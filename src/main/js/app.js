'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const FormControl = require('react-bootstrap').FormControl;
const FormGroup = require('react-bootstrap').FormGroup;
const ControlLabel = require('react-bootstrap').ControlLabel;
const Button = require('react-bootstrap').Button;
const InputGroup = require('react-bootstrap').InputGroup;
const Checkbox = require('react-bootstrap').Checkbox;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todoLists: [], newListName: '', updatedListName: '', todoItemAdders: []};
        this.handleNewListNameChange = this.handleNewListNameChange.bind(this);
        this.handleUpdatedListNameChange = this.handleUpdatedListNameChange.bind(this);
        this.handleItemAdderNameChange = this.handleItemAdderNameChange.bind(this);
        this.handleNewList = this.handleNewList.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
        this.handleUpdateList = this.handleUpdateList.bind(this);
        this.handleNewItem = this.handleNewItem.bind(this);
    }

    componentDidMount() {
        fetch('/lists', {
            method: 'GET',
            credentials: 'same-origin'
        }).then(response => {
            return response.json();

        }).then(json => {
            this.setState({todoLists: json, todoItemAdders: new Array(json.length).fill('')});
        });
    }

    handleItemAdderNameChange(index, name) {
        this.setState(function (prevState, props) {
            let myTodoItemAdders = prevState.todoItemAdders;
            myTodoItemAdders[index] = name;
            return {
                todoItemAdders: myTodoItemAdders
            };
        });
    }

    handleNewListNameChange(listName) {
        this.setState({newListName: listName});
    }

    handleUpdatedListNameChange(listName) {
        this.setState({updatedListName: listName});
    }

    handleNewList() {
        let newList = {
            name: this.state.newListName
        };
        fetch('/lists', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(newList),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState(function (prevState, props) {
                let myTodoLists = prevState.todoLists;
                myTodoLists.push(json);
                return {
                    todoLists: myTodoLists,
                    newListName: ''
                };
            });
        });
    }

    handleNewItem(index, listId) {
        let newItem = {
            name: this.state.todoItemAdders[index]
        }
        fetch('/lists/' + listId + '/items', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(newItem),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState(function (prevState, props) {
                let myTodoLists = prevState.todoLists;
                myTodoLists.forEach(function (todoList) {
                    if (todoList.id == listId) {
                        todoList.items.push(json);
                    }
                });
                let myTodoItemAdders = prevState.todoItemAdders;
                myTodoItemAdders[index] = '';
                return {
                    todoLists: myTodoLists,
                    todoItemAdders: myTodoItemAdders
                };
            });
        });
    }

    handleUpdateList(listId) {
        let updatedList = {
            name: this.state.updatedListName
        };
        fetch('/lists/' + listId, {
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify(updatedList),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            this.setState(function (prevState, props) {
                let myTodoLists = prevState.todoLists;
                myTodoLists.forEach(function (todoList) {
                    if (todoList.id === listId) {
                        todoList.name = prevState.updatedListName;
                    }
                });
                return {
                    todoLists: myTodoLists,
                    updatedListName: ''
                };
            });
        });
    }

    handleDeleteList(listId) {
        fetch('/lists/' + listId, {
            method: 'DELETE',
            credentials: 'same-origin'
        }).then(response => {
            this.setState(function (prevState, props) {
                let myTodoLists = prevState.todoLists.filter((todoList =>
                    todoList.id !== listId
                ));
                return {
                    todoLists: myTodoLists
                };
            });
        });
    }

    render() {
        const newListName = this.state.newListName;
        return (
            <div>
                <TodoLists lists={this.state.todoLists}
                           itemAdders={this.state.todoItemAdders}
                           updatedListName={this.state.updatedListName}
                           onDeleteList={this.handleDeleteList}
                           onUpdateList={this.handleUpdateList}
                           onListNameChange={this.handleUpdatedListNameChange}
                           onItemAdderNameChange={this.handleItemAdderNameChange}
                           onAddItem={this.handleNewItem}
                />
                <AddTodoList listName={newListName}
                             onAddList={this.handleNewList}
                             onListNameChange={this.handleNewListNameChange}/>
            </div>
        );
    }

}

class AddTodoList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.props.onListNameChange(e.target.value);
    }

    handleClick() {
        this.props.onAddList();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleClick();
    }

    render() {
        const listName = this.props.listName;
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <ControlLabel>Enter a name for your new list:</ControlLabel>
                    <FormControl
                        type="text"
                        value={listName}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                    />
                    <Button bsStyle="default" onClick={this.handleClick}>Add List</Button>
                </FormGroup>
            </form>
        );
    }
}

class TodoLists extends React.Component {
    constructor(props) {
        super(props);

        this.handleListNameClick = this.handleListNameClick.bind(this);
        this.renderNameOrEditField = this.renderNameOrEditField.bind(this);
        this.toggleEditingOff = this.toggleEditingOff.bind(this);

        this.state = {editing: ''};
    }

    toggleEditingOff() {
        this.setState({editing: ''});
    }

    handleListNameClick(listId, listName) {
        this.props.onListNameChange(listName);
        this.setState({editing: listId});
    }

    renderNameOrEditField(list) {
        if (this.state.editing === list.id) {
            return (
                <EditUpdateDeleteObject object={list}
                                        updatedName={this.props.updatedListName}
                                        onDeleteObject={this.props.onDeleteList}
                                        onUpdateObject={this.props.onUpdateList}
                                        onNameChange={this.props.onListNameChange}
                                        toggleOff={this.toggleEditingOff}
                />
            );
        } else {
            return (
                <h3 onClick={() => this.handleListNameClick(list.id, list.name)}>{list.name} <Button bsStyle="danger"
                                                                                                     onClick={() => this.props.onDeleteList(list.id)}>Delete</Button>
                </h3>
            )
        }
    }

    render() {
        var todoLists = this.props.lists.map((list, index) =>
            <div key={list.id}>
                {this.renderNameOrEditField(list)}
                <TodoList index={index}
                          listId={list.id}
                          items={list.items}
                          onItemAdderNameChange={this.props.onItemAdderNameChange}
                          onAddItem={this.props.onAddItem}
                          itemAdderName={this.props.itemAdders[index]}/>
            </div>
        );
        return (
            <div>
                {todoLists}
            </div>
        );
    }
}

class EditUpdateDeleteObject extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleSubmit(e, objId) {
        e.preventDefault();
        this.handleUpdateButtonClick(objId);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    handleUpdateButtonClick(objId) {
        this.props.onUpdateObject(objId);
        this.props.toggleOff();
    }

    handleDeleteButtonClick(objId) {
        this.props.onDeleteObject(objId);
    }

    render() {
        let obj = this.props.object;
        return (
            <form onSubmit={(e) => this.handleSubmit(e, obj.id)}>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Enter text"
                            value={this.props.updatedName}
                            onChange={this.handleNameChange}
                        />
                        <InputGroup.Button>
                            <Button onClick={() => this.handleUpdateButtonClick(obj.id)}>Update</Button>
                        </InputGroup.Button>
                        <InputGroup.Button>
                            <Button bsStyle="danger"
                                    onClick={() => this.handleDeleteButtonClick(obj.id)}>Delete</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
        );
    }

}

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleItemNameClick = this.handleItemNameClick.bind(this);
        this.handleItemNameChange = this.handleItemNameChange.bind(this);
        this.handleUpdateItem = this.handleUpdateItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.toggleEditingOff = this.toggleEditingOff.bind(this);
        this.handleItemCheckboxChange = this.handleItemCheckboxChange.bind(this);

        this.state = {editing: '', updatedItemName: '', items: []};
    }

    componentDidMount() {
        this.setState({items: this.props.items});
    }

    toggleEditingOff() {
        this.setState({editing: ''});
    }

    handleItemNameClick(itemId, itemName) {
        this.handleItemNameChange(itemName);
        this.setState({editing: itemId});
    }

    handleItemNameChange(itemName) {
        this.setState({updatedItemName: itemName});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAddItem(this.props.index, this.props.listId);
    }

    handleDeleteItem(listId, itemId) {
        fetch('/lists/' + listId + '/items/' + itemId, {
            method: 'DELETE',
            credentials: 'same-origin'
        }).then(response => {
            this.setState(function (prevState, props) {
                let myItems = prevState.items.filter(item => item.id !== itemId);
                return {
                    items: myItems
                };
            });
        })
    }

    handleUpdateItem(listId, itemId) {
        let updatedItem = {
            name: this.state.updatedItemName
        }
        fetch('/lists/' + listId + '/items/' + itemId, {
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify(updatedItem),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            this.setState(function (prevState, props) {
                let myItems = prevState.items;
                myItems.forEach(function (item) {
                    if (item.id === itemId) {
                        item.name = prevState.updatedItemName;
                    }
                });
                return {
                    items: myItems,
                    updatedItemName: ''
                }
            });
        });
    }

    handleItemCheckboxChange(listId, itemId) {
        let itemToToggle = this.state.items.filter( item => item.id === itemId)[0];
        itemToToggle.completed = !itemToToggle.completed;
        fetch('/lists/' + listId + '/items/' + itemId, {
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify(itemToToggle),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            this.setState(function (prevState, props) {
                let myItems = prevState.items;
                myItems.forEach(function (item) {
                    if (item.id === itemId) {
                        item.completed = itemToToggle.completed;
                    }
                });
                return {
                    items: myItems,
                    updatedItemName: ''
                }
            });
        })
    }

    render() {
        let editing = this.state.editing;
        let updatedItemName = this.state.updatedItemName;
        let handleItemNameClick = this.handleItemNameClick;
        let handleItemNameChange = this.handleItemNameChange;
        let handleDeleteItem = this.handleDeleteItem;
        let handleUpdateItem = this.handleUpdateItem;
        let toggleEditingOff = this.toggleEditingOff;
        let handleItemCheckboxChange = this.handleItemCheckboxChange;
        let listId = this.props.listId;
        let items = this.state.items.map(function (item) {
            if (editing === item.id) {
                return (
                    <ListGroupItem key={item.id}>
                        <EditUpdateDeleteObject object={item}
                                                updatedName={updatedItemName}
                                                onDeleteObject={(itemId) => handleDeleteItem(listId, itemId)}
                                                onUpdateObject={(itemId) => handleUpdateItem(listId, itemId)}
                                                onNameChange={handleItemNameChange}
                                                toggleOff={toggleEditingOff}/>
                    </ListGroupItem>
                );
            } else {
                return (
                    <ListGroupItem key={item.id}>
                        <Checkbox checked={item.completed}
                            onChange={() => handleItemCheckboxChange(listId, item.id)}>
                            <div onClick={() => handleItemNameClick(item.id, item.name)}>
                                {item.name}
                            </div>
                        </Checkbox>
                    </ListGroupItem>
                );
            }
        });
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                                value={this.props.itemAdderName}
                                onChange={(e) => this.props.onItemAdderNameChange(this.props.index, e.target.value)}
                            />
                            <InputGroup.Button>
                                <Button
                                    onClick={(e) => this.props.onAddItem(this.props.index, this.props.listId)}>Add</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </form>
                <ListGroup>
                    {items}
                </ListGroup>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);
