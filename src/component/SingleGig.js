import React, { Component } from 'react';
import { connect } from "react-redux"
import axios from 'axios';
import Task from './Task'
// import { Link } from 'react-router-dom'
import Switch from 'react-switch'
import { userInfo} from '../redux/userReducer'
import { isBigIntLiteral } from '@babel/types';
// import TaskWizard from './TaskWizard'
import swal from 'sweetalert';

const ms = require('pretty-ms')


class SingleGig extends Component {
    state = {
        client: {},
        amountDue: 0,
        toggleEdit: false,
        title: null,
        description: null,
        project_rate: 0,
        is_paid: false,
        is_billed: false,
        menuOn: false,
        isLoading: false
    }


    componentDidMount () {
        let id = this.getGigClient()
        this.getClient(id)
        let {gig_id} = this.props.match.params
        axios.get(`/api/getSingleGig/${gig_id}`).then(res => {
            this.setState({
                is_paid: res.data.is_paid,
                is_billed: res.data.is_billed
            })
        })
        
    }

    getClient = (id) => {
        axios.post("/api/clients", { id }).then(res => {
            this.setState({
                client: res.data
            })
        })
    }

    getGigClient = () => {
        let gig = this.props.match.params.gig_id
        let id = this.props.gigs.filter(gigs => +gig === +gigs.id)
        console.log(id)
        if (!id[0]) {
            return
        }
        let clientId = id[0].client_id
        return clientId
    }

    deleteGig = (id) => {
        axios.delete(`/api/gigs/${id}`).then(res => {
            this.props.userInfo(res.data)
        })
        this.props.history.push('/userHome')
        swal("Gig deleted", "", "success")
    }

    sendUpdateToClientHandler = (firstName, clientEmail, gig_id) => {
        console.log(firstName, clientEmail, gig_id)
        axios.post(`/update/${gig_id}`, { firstName, clientEmail }).then(res => {

        }).catch(err => {
            console.log(err)
        })
    }

    editGig = (id) => {
        const { title, description, project_rate } = this.state
        // project_rate = +project_rate
        axios.put(`/api/gigs/${id}`, { title, description, project_rate }).then((res) => {
            this.props.userInfo(res.data)
        })
        this.toggleEdit()
    }

    toggleEdit = () => {
        this.setState({
            toggleEdit: !this.state.toggleEdit
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePaidSwitch = async () => {
        await this.setState({
            is_paid: !this.state.is_paid
        })
        this.saveToDBPaid()
    }

    saveToDBPaid = async () => {
        const { gig_id: id } = this.props.match.params
        const { is_paid} = this.state
        this.setState({
            isLoading: true
        })
        await axios.put(`/api/gig/paid/${id}`, { is_paid })
        this.setState({
            isLoading: false
        })
    }

    saveToDBBilled = async () => {
        const { gig_id: id } = this.props.match.params
        const { is_billed } = this.state
        this.setState({
            isLoading: true
        })
        await axios.put(`/api/gig/billed/${id}`, { is_billed })
        this.setState({
            isLoading: false
        })
    }

    handleBilledSwitch = async () => {
        await this.setState({
            is_billed: !this.state.is_billed
        })
        console.log(this.state.is_billed)
        this.saveToDBBilled()
    }

    menuToggle = () => {
        this.setState({
            menuOn: !this.state.menuOn
        })
    }

    billThem = () => {
        let gig_id = this.props.match.params.gig_id
        axios.post(`/billGig/${gig_id}`, {
            total: this.state.amountDue,

        }).then((res) => {
            this.props.history.push('/userHome')
            alert('your email has been sent to the client!')
        }
        ).catch(err => console.log(err, 'frontendError'))
        swal("Client billed", "", "success")
    }

    render() {
        const { client } = this.state
        let gig_id = this.props.match.params.gig_id
        let gig = this.props.gigs.filter(gig => +gig_id === +gig.id)
        gig = gig[0]

        let gigDisplay = (this.props.firstName && !this.state.toggleEdit) ?

            <div className="gig_card_container" >
                <h2 className="card_title">{gig.title}</h2>
                <p>Client name: {client.client_first} {client.client_last}</p>
                <p>Client contact: {client.client_email} {client.client_phone}</p>
                <p>Gig description: {gig.description}</p>
                <p>Total development time: {ms(gig.total_time)}</p>
                <p>Gig rate: ${gig.project_rate}</p>
                <p>Ammount due: ${((gig.total_time / 1000 / 60 / 60) * gig.project_rate).toFixed(2)}</p>
                {(this.state.isLoading) ? "Loading..." : <div><p>Paid:{gig.is_paid}</p> <Switch checked={this.state.is_paid} onChange={this.handlePaidSwitch}></Switch> </div>}
                <p>Billed: {gig.is_billed}</p> <Switch value={this.state.is_billed} checked={this.state.is_billed} onChange={this.handleBilledSwitch}></Switch>


                <div className="button_task_container">
                    <button onClick={() => {
                        this.sendUpdateToClientHandler(client.client_first, client.client_email, gig_id)
                    }}>Send Update To Client </button>
                </div>


                <div>
                    <Task gig={gig} />


                    <div id="circularMenu" class={this.state.menuOn ? 'circular-menu active' : 'circular-menu'}>
                        <div class="floating-btn" onClick={this.menuToggle}>
                            <i class="fa fa-plus"></i>
                        </div>
                        <menu class="items-wrapper">
                            <a href={"/#/taskwizard/" + gig_id} class="menu-item ">create</a>
                            <div onClick={() => this.deleteGig(gig.id)} class="menu-item ">delete</div>
                            <div onClick={this.toggleEdit} class="menu-item ">edit</div>
                            <div onClick={this.billThem} class="menu-item">bill</div>
                        </menu>
                    </div>


                </div>

            </div> : (this.props.firstName && this.state.toggleEdit) ?
                <div>

                    <p className="sub_header">Gig Title:</p>
                    <input className="input_task_container" onChange={this.handleChange} placeholder={this.state.title}
                        value={this.state.title} name='title' />
                    <p className="sub_header">Gig Description:</p>
                    <input className="input_task_container" onChange={this.handleChange} placeholder={this.state.description}
                        value={this.state.description} name="description" />
                    <p className="sub_header">Gig rate:</p>
                    <input className="input_task_container" onChange={this.handleChange} placeholder={this.state.project_rate}
                        value={this.state.project_rate} name='project_rate' />
                    <div className="button_task_container">
                        <button onClick={() => this.editGig(gig.id)}>save</button>
                    </div>

                </div>
                : null
        return (
            <div className="gigDisplay_container">

                {gigDisplay}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let { gigs, firstName } = state
    return { gigs, firstName }
}

const mapDispatchToProps = {
    userInfo
  }

export default connect(mapStateToProps, mapDispatchToProps)(SingleGig);