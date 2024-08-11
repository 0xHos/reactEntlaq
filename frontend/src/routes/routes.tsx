import {BrowserRouter } from 'react-router-dom';
import { AdminRoutes } from './admin_routes';
import { VisitorRoutes } from './visitor_routes';


export default function RoutesApp(){
    return (
        <BrowserRouter>
            <AdminRoutes />
            <VisitorRoutes />
        </BrowserRouter>
      );
}
