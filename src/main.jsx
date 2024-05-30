import * as React from "react";
import * as ReactDOM from "react-dom/client";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";

import Root, {
    loader as rootLoader,
    action as rootAction,
} from "./routes/root"


import ErrorPage from "./error-page";
import Contact, {
    loader as contactLoader,
    action as contactAction,
} from "./routes/contact";

import EditContact, {
    action as editAction,
} from "./routes/edit";

import Index from "./routes/index"


import { action as destroyAction} from "./routes/destroy";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <Index /> },
                    {
                        path: "contacts/:contactId",
                        element: <Contact />,
                        loader: contactLoader,
                        action: contactAction,
                    }
                ]
            },
            // {
            //     path: "contacts/:contactId",
            //     element: <Contact />,
            //     loader: contactLoader,
            //     action: contactAction,
            // },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                // there is no reason to share loaders between routes
                //we're just being lazy for the sake of the tutorial
                loader: contactLoader,
                action: editAction,
            },
            {
                path: "contacts/:contactId/destroy",
                action: destroyAction,
                errorElement: <div>Oops! There was an error here bud. Way she goes</div> 
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
