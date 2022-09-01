import { Link } from "react-router-dom";

type ContributorListDataType = {
  data: {
    login: string;
    avatar_url: string;
    contributions: number;
  }[];
};

const ContributorList = ({ data }: ContributorListDataType) => (
  <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    {(data || []).map(
      (contributor: {
        login: string;
        avatar_url: string;
        contributions: number;
      }) => (
        <Link to={`/contributor/${contributor.login}`} key={contributor.login}>
          <li className="container flex flex-wrap justify-between items-center mx-auto py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
            <img
              className="w-10 h-10 rounded-full shadow-lg"
              src={contributor.avatar_url}
            />
            <div>{contributor.login}</div>
            <div>({contributor.contributions})</div>
          </li>
        </Link>
      )
    )}
  </ul>
);

export default ContributorList;
