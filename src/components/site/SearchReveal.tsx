import { SearchResult } from "@/types/SearchResult";

type Props = {
    results: SearchResult | any;
}

export const SearchReveal = ( { results } : Props )=> {

    results = { person: {id: 1, name: 'Hiago de  Oliveira'}, personMatched: {id: 2, name: 'Cláudia de Freitas'}};

    return (
        <div>
            <p className="text-3xl ">{results.person.name}</p>
            <p className="text-2xl my-3">parabéns, você tirou: </p>
            <p className="text-4xl bg-blue-700 my-5 py-8  border-dashed border-blue-300 border-2"
            >{results.personMatched.name}</p>
        </div>
    );
  
}