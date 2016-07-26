import React , {Component} from 'react';
import Header from '../components/Header'
import MainSection from '../components/MainSection'

export default class Todos extends Component {
    render() {
        const {actions, todos} = this.props;
        return (
            <div>
                <Header addTodo={actions.addTodo}/>
                <MainSection todos={todos} actions={actions}/>
            </div>
        );
    }
}