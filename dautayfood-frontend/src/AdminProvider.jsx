import { ProductsProvider } from './admin/contexts/ProductsContext';
import { UsersProvider } from "./admin/contexts/UsersContext";
import { OrdersProvider } from "./admin/contexts/OrdersContext";

export default function AdminAppProviders({ children }) {
    return (
        <ProductsProvider>
            <UsersProvider>
                <OrdersProvider>{children}</OrdersProvider>
            </UsersProvider>
        </ProductsProvider>
    );
}
