import { Link } from "react-router-dom";

interface NavRouteProps {
  title: string;
  route: string;
}

const NavRoute = ({ title, route }: NavRouteProps) => {
  return (
    <div className="flex items-center justify-between">
      <Link to={route}>{title}</Link>
    </div>
  );
};

export default NavRoute;
