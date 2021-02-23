import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

const App = () => (
    <BrowserRouter>
        <ToastProvider
            autoDismiss
            autoDismissTimeout={6000}
            placement="top-center"
        >
            <Route path="/" exact component={Join}></Route>
            <Route path="/chat" exact component={Chat}></Route>
        </ToastProvider>
    </BrowserRouter>
);

export default App;
