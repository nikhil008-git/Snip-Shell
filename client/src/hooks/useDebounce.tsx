// import * as React from "react";
// import { useDebounce } from "@uidotdev/usehooks";
// import searchHackerNews from "./searchHackerNews";
// import SearchResults from "./SearchResults";

// export default function App() {
//   const [searchTerm, setSearchTerm] = React.useState("js");
//   const [results, setResults] = React.useState([]);
//   const [isSearching, setIsSearching] = React.useState(false);
//   const debouncedSearchTerm = useDebounce(searchTerm, 300);

//   const handleChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     setSearchTerm(formData.get("search"));
//     e.target.reset();
//     e.target.focus();
//   };

//   React.useEffect(() => {
//     const searchHN = async () => {
//       let results = [];
//       setIsSearching(true);
//       if (debouncedSearchTerm) {
//         const data = await searchHackerNews(debouncedSearchTerm);
//         results = data?.hits || [];
//       }

//       setIsSearching(false);
//       setResults(results);
//     };

//     searchHN();
//   }, [debouncedSearchTerm]);

//   return (
//     <section>
//       <header>
//         <h1>useDebounce</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             name="search"
//             placeholder="Search HN"
//             style={{ background: "var(--charcoal)" }}
//             onChange={handleChange}
//           />
//           <button className="primary" disabled={isSearching} type="submit">
//             {isSearching ? "..." : "Search"}
//           </button>
//         </form>
//       </header>
//       <SearchResults results={results} />
//     </section>
//   );
// }