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

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todoLists: [], newListName: '', updatedListName: ''};
        this.handleNewListNameChange = this.handleNewListNameChange.bind(this);
        this.handleUpdatedListNameChange = this.handleUpdatedListNameChange.bind(this);
        this.handleNewList = this.handleNewList.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
        this.handleUpdateList = this.handleUpdateList.bind(this);
    }

    componentDidMount() {
        fetch('/lists', {
            method: 'GET',
            credentials: 'same-origin'
        }).then(response => {
            return response.json();

        }).then(json => {
            this.setState({todoLists: json});
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
                           updatedListName={this.state.updatedListName}
                           onDeleteList={this.handleDeleteList}
                           onUpdateList={this.handleUpdateList}
                           onListNameChange={this.handleUpdatedListNameChange}
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
                                                                                                     onClick={() => this.handleDeleteButtonClick(list.id)}>Delete</Button>
                </h3>
            )
        }
    }

    render() {
        var todoLists = this.props.lists.map(list =>
            <div key={list.id}>
                {this.renderNameOrEditField(list)}
                <TodoList items={list.items}/>
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
    render() {
        var items = this.props.items.map(item =>
            <ListGroupItem key={item.id}>
                {item.name}
            </ListGroupItem>
        );
        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);
