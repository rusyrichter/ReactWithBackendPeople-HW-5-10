import React from 'react';
import axios from 'axios';
import PersonRow from './PersonRow'
import AddPersonForm from './AddPersonForm'


class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: '',
        },
        editMode: false,        
        checkedPeopleId: [],
           
    }

    getAllPeople = () => {
        axios.get('/api/people/getall').then(res => {
            this.setState({
                people: res.data,
                editMode: false,
            })
        })
    }

    componentDidMount = () => {
        this.getAllPeople();
    }

    generateTable = () => {
        const { people, checkedPeopleId, selectAll } = this.state;
        return people.map(p => <PersonRow          
                key={p.id}
                person={p}
                onDeleteClick={() => this.onDeleteClick(p)}
                onCheckedClick={() => this.onCheckedClick(p.id)}
                isChecked={checkedPeopleId.includes(p.id)}
                onEditClick={() => this.onEditClick(p)}
                selectAll={selectAll}
            />)


       
    }

    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }
    onAddClick = () => {
        axios.post('/api/people/add', this.state.person).then(() => {
            this.getAllPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
        });
    }
    onDeleteClick = (p) => {
        axios.post('/api/people/delete', p).then(() => {
            this.getAllPeople();
        });
    }
    onEditClick = (p) => {

        this.setState({
            person: {
                firstName: p.firstName,
                lastName: p.lastName,
                age: p.age,
                id: p.id,
            },

            editMode: true
        })
    }

    onCancelClick = () => {
        this.setState({
            editMode: false,
            person: {
                firstName: '',
                lastName: '',
                age: ''
            }
        });
    }

    onUpdateClick = () => {
        axios.post('/api/people/update', this.state.person).then(() => {
            this.getAllPeople();
            this.setState({
                editMode: false,
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
        });
    }
    onCheckedClick = (id) => {
        const { checkedPeopleId } = this.state;
        if (checkedPeopleId.includes(id)) {
            this.setState({
                checkedPeopleId: checkedPeopleId.filter(p => p.id !== id),
            });

        } else {
            this.setState({
                checkedPeopleId: [...checkedPeopleId, id],
            });
        }
    }

  

    DeleteAll = () => {
        const { checkedPeopleId } = this.state;
        axios.post('/api/people/deleteAll', {
            ids: [...checkedPeopleId]
        }).then(() => {
            this.getAllPeople();
            this.setState({
                checkedPeopleId: [],    
                selectAll: false
         })
        });
    }

    ShowSelectedAll = () => {     
        const { selectAll, people} = this.state;
        if (selectAll) {
            const ids = people.map(p => p.id);
            this.setState({ checkedPeopleId: [... ids] })           
        }
        else {
            this.setState({ checkedPeopleId: [] })
        }
        console.log(this.state.checkedPeopleId);
    }
    SelectAll = () => {
        this.setState({ selectAll: true});
        this.ShowSelectedAll();
                      
    }
    UnselectAll = () => {
        this.setState({ selectAll: false });
        this.ShowSelectedAll();

    }

    render() {
        const { firstName, lastName, age, id } = this.state.person;


        return <div id="root">
            <AddPersonForm
                firstName={firstName}
                lastName={lastName}
                age={age}
                id={id}
                onTextChange={this.onTextChange}
                onAddClick={this.onAddClick}
                editMode={this.state.editMode}
                onCancelClick={this.onCancelClick}
                onUpdateClick={this.onUpdateClick}
            />
            <div className="container mt-5">
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: "15%" }}>
                                <button onClick={this.DeleteAll} className="btn btn-danger w-100">Delete All</button>
                                <button onClick={this.SelectAll} className="btn btn-outline-danger w-100 mt-2">Check All</button>
                                <button onClick={this.UnselectAll} className="btn btn-outline-danger w-100 mt-2">Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateTable()}
                    </tbody>
                </table>
            </div>

        </div>

    }
}
export default PeopleTable;