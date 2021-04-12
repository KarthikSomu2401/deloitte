import React, { Component, useState } from "react";
import NavHeader from "./navbar.component";
import Cookies from "universal-cookie";
import { FaCheck, FaEdit, FaRegPlusSquare, FaTrash } from "react-icons/fa";
import DateTimePicker from 'react-datetime-picker';
const cookies = new Cookies();

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userTasksOriginal: [],
            userTasks: [],
            taskName: "",
            currentId: 0,
            taskDescription: "",
            taskDateTime: new Date(),
            updateTaskName: "",
            updateTaskDescription: "",
            updateTaskDateTime: new Date(),
            seeCompleted: false,

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
    }
    myTasksArrange = function (tasks) {
        const scrollStyle = {
            overflowX: 'scroll'
        }
        const postData = tasks.map((task) => (
            <React.Fragment key={task.id}>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"><h3 className="float-left">{task.taskName}</h3></div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3"><p className="float-left">{task.taskDateTime}</p></div>
                            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5" style={scrollStyle}> <p className="float-left">{task.taskDescription}</p></div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">{task.complete ? <span></span> : <button className="btn btn-success crd-btn float-right" onClick={() => this.handleComplete(task.id)}><FaCheck /></button>}<button className="btn btn-danger crd-btn float-right" onClick={() => this.handleDelete(task.id)}><FaTrash /></button>{task.complete ? <span></span> : <button className="btn btn-primary crd-btn float-right" data-toggle="modal" data-target="#updateTaskModal" onClick={this.displayData(task)}><FaEdit /></button>}</div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        ));

        this.setState({
            userTasks: this.state.userTasks.concat(postData),
        });
    };
    displayData = function (value) {
        this.setState({
            currentId: value.id,
            updateTaskName: value.taskName,
            updateTaskDescription: value.taskDescription,
            updateTaskDateTime: new Date(value.taskDateTime),
        })
    }

    myTasksRefresh = function (tasks) {
        const scrollStyle = {
            overflowX: 'scroll'
        }
        this.setState({
            userTasks: [],
        });
        const postData = tasks.map((task) => (
            <React.Fragment key={task.id}>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"><h3 className="float-left">{task.taskName}</h3></div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3"><p className="float-left">{task.taskDateTime}</p></div>
                            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5" style={scrollStyle}> <p className="float-left">{task.taskDescription}</p></div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">{task.complete ? <span></span> : <button className="btn btn-success crd-btn float-right" onClick={() => this.handleComplete(task.id)}><FaCheck /></button>}<button className="btn btn-danger crd-btn float-right" onClick={() => this.handleDelete(task.id)}><FaTrash /></button>{task.complete ? <span></span> : <button className="btn btn-primary crd-btn float-right" data-toggle="modal" data-target="#updateTaskModal" onClick={this.displayData(task)}><FaEdit /></button>}</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        ));
        this.setState({
            userTasks: this.state.userTasks.concat(postData),
        });
    };
    displayCompleted() {
        this.seeCompleted = true;
        this.getFreshData(cookies.get("userName"), "true");
    }
    displayNonCompleted() {
        this.seeCompleted = false;
        this.getFreshData(cookies.get("userName"), "false");
    }
    handleSubmit(event) {
        event.preventDefault();
        let formdata = {
            taskName: this.state.taskName,
            taskDescription: this.state.taskDescription,
            utcString: this.state.taskDateTime.toUTCString(),
            isComplete: false
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        };
        fetch(`${process.env.REACT_APP_API_URL}/todo/create-task?userName=${cookies.get("userName")}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.myTasksArrange([data]);
                this.setState({
                    taskName: "",
                    taskDescription: "",
                    taskDateTime: new Date(),
                    userTasksOriginal: this.state.userTasksOriginal.concat(data)
                })
            });
    }
    handleUpdate(event) {
        event.preventDefault();
        let formdata = {
            id: this.state.currentId,
            taskName: this.state.updateTaskName,
            taskDescription: this.state.updateTaskDescription,
            utcString: this.state.updateTaskDateTime.toUTCString(),
            isComplete: false
        };
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        };
        fetch(`${process.env.REACT_APP_API_URL}/todo/update-task?userName=${cookies.get("userName")}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.getFreshData(cookies.get("userName"), "false");
                this.setState({
                    updateTaskName: "",
                    updateTaskDescription: "",
                    updateTaskDateTime: new Date(),
                })
            });
    }

    deleteTask = (taskToDeleteId) => {
        const tasks = this.state.userTasksOriginal.filter(task => task.id !== taskToDeleteId);
        this.setState({
            userTasksOriginal: tasks
        });
        this.myTasksRefresh(tasks);
    }

    handleComplete(id) {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${process.env.REACT_APP_API_URL}/todo/mark-complete?taskId=${id}`, requestOptions)
            .then((data) => {
                this.getFreshData(cookies.get("userName"), "false");
            });
    }
    handleDelete(id) {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${process.env.REACT_APP_API_URL}/todo/delete-task?taskId=${id}`, requestOptions)
            .then((data) => {
                this.deleteTask(id);
            });
    }
    getFreshData(userName, completed) {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${process.env.REACT_APP_API_URL}/todo/get-all-tasks?userName=${userName}&completed=${completed}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    userTasksOriginal: []
                })
                if (data.length > 0) {
                    this.setState({
                        userTasksOriginal: this.state.userTasksOriginal.concat(data)
                    })
                }
                this.myTasksRefresh(data);
            });
    }
    componentDidMount() {
        if (cookies.get("userName") != null) {
            this.setState({ userName: cookies.get("userName") });
            this.getFreshData(cookies.get("userName"), "false");
        } else {
            window.location.href = "/";
        }
    }

    myChangeHandler = (event) => {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div>
                <NavHeader />
                <br />
                <div className="container-fluid">
                    <div className="modal fade" id="addTaskModal" tabIndex="-1" role="dialog" aria-labelledby="addTaskModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addTaskModalLabel">Create ToDo Task</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label htmlFor="taskName" className="col-form-label">Name</label>
                                            <input type="text" className="form-control" id="taskName" name="taskName" value={this.state.taskName} onChange={this.myChangeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="taskDescription" className="col-form-label">Description</label>
                                            <textarea className="form-control" id="taskDescription" name="taskDescription" value={this.state.taskDescription} onChange={this.myChangeHandler}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message-text" className="col-form-label">Pick Date and Time: </label>
                                            <DateTimePicker name="taskDateTime" id="taskDateTime" value={this.state.taskDateTime} onChange={(value) => this.setState({ taskDateTime: value })} /></div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" data-toggle="modal" data-target="#addTaskModal" className="btn btn-primary">Create Task</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="updateTaskModal" tabIndex="-1" role="dialog" aria-labelledby="updateTaskModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="updateTaskModalLabel">Update ToDo Task</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={this.handleUpdate}>
                                    <div className="modal-body">
                                        <input type="hidden" value=""></input>
                                        <div className="form-group">
                                            <label htmlFor="taskName" className="col-form-label">Name</label>
                                            <input type="text" className="form-control" id="updateTaskName" name="updateTaskName" value={this.state.updateTaskName} onChange={this.myChangeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="taskDescription" className="col-form-label">Description</label>
                                            <textarea className="form-control" id="updateTaskDescription" name="updateTaskDescription" value={this.state.updateTaskDescription} onChange={this.myChangeHandler}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message-text" className="col-form-label">Pick Date and Time: </label>
                                            <DateTimePicker name="updateTaskDateTime" id="updateTaskDateTime" value={this.state.updateTaskDateTime} onChange={(value) => this.setState({ updateTaskDateTime: value })} /></div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" data-toggle="modal" data-target="#updateTaskModal" className="btn btn-primary">Update Task</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <button type="button" className="btn btn-primary crd-btn float-right" data-toggle="modal" data-target="#addTaskModal">
                                <FaRegPlusSquare /> Add ToDo
                            </button>
                            <button type="button" hidden={this.seeCompleted} className="btn btn-success crd-btn float-right" onClick={() => this.displayCompleted()}>
                                <FaCheck /> See Completed
                            </button>
                            <button type="button" hidden={!this.seeCompleted} className="btn btn-warning crd-btn float-right" onClick={() => this.displayNonCompleted()}>
                                <FaCheck /> See InComplete
                            </button>
                        </div>
                    </div>
                    <div className="listContainer">
                        {this.state.userTasks.length > 0 ? this.state.userTasks : "Nothing to Display!!!"}
                    </div>
                </div>
            </div>
        );
    }
}