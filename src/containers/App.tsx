import React, { PropTypes } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from '../components/Footer';
import { increment, decrement } from '../ducks/CounterDucks';
import { IGlobalState } from '../store/configureStore';

interface IProps {
  counter: number;
  actions: any;
  children: any;
}

const App = ({ counter, actions, children }: IProps) => (
  <div className="main-app-container">
    <div className="main-app-nav">
      <div id="main-app-title">Simple Redux Boilerplate</div>
      <div>
        <span><Link to="/">Home</Link></span>
        <span><Link to="/foo">Foo</Link></span>
        <span><Link to="/bar">Bar</Link></span>
      </div>
    </div>
    <div>
      {
        React.cloneElement(children, { counter, actions })
      }
    </div>
    <Footer />
  </div>
);

const mapStateToProps = (state: IGlobalState) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch: Dispatch<IGlobalState>) => ({
  actions: bindActionCreators({ increment, decrement }, dispatch),
});

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
