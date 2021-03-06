// エントリポイント
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Page components
import Login from "./pages/login";
import Menu from "./pages/menu";
import Users from "./pages/users";
import UserForm from "./pages/users/UserForm";
import UserCreate from "./pages/users/UserCreate";
import Items from "./pages/items";
import CarCreate from "./pages/car/CarCreate";
import CarSearch from "./pages/car/CarSearch";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/new" >
          <UserCreate pageMode="new" />
        </Route>
        <Route exact path="/users/new/edit" >
          <UserCreate pageMode="new" />
        </Route> 
        <Route exact path="/users/:id" >
          <UserForm pageMode="show" />
        </Route>
        <Route exact path="/users/:id/edit" >
          <UserForm pageMode="edit" />
        </Route>
        <Route exact path="/items" component={Items} />
        <Route exact path="/CarCreate" component={CarCreate} />
        <Route exact path="/CarSearch" component={CarSearch} />
      </Switch>
    </BrowserRouter>
  );
}

// このDOMに差し込みます
const app = document.getElementById('app');
ReactDOM.render(<App />, app);
