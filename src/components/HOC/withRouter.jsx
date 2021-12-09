import { useParams, useSearchParams } from "react-router-dom";
export const withRouter = (Component) => {
    const WrappedComponent = (props) => {
        const params = useParams();
        const [searchParams, setSearchParams] = useSearchParams();
        // etc... other react-router-dom v6 hooks
        return (
            <Component
                {...props}
                params={params}
                {...{searchParams, setSearchParams}}
            />
        );
    }
    WrappedComponent.displayName = `WrappedComponent(${Component.displayName || Component.name || "Component"})`;
    return WrappedComponent;
};