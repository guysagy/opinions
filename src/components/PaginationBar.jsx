import Link from 'next/link';
import { ChevronLeftIcon , ChevronRightIcon } from '@heroicons/react/20/solid';

const PaginationBar = ({url, page, pageCount}) => {
    return (
        <div className="flex gap-2 pb-3">
            <PaginationLink href={`${url}?page=${page-1}`}>
                <ChevronLeftIcon className="h-5 w-5"/>
            </PaginationLink>
            <span>Page {page} of { pageCount }</span>
            <PaginationLink href={`${url}?page=${page+1}`}>
                <ChevronRightIcon className="h-5 w-5"/>
            </PaginationLink>
        </div>
    );
}

function PaginationLink({href, children}) {
    return (
        <Link href={href}
            className="border rounded text-slate-500 text-sm
                        hover:bg-orange-200 hover:text-slate-700"
        >
            {children}
        </Link>
    );
}
export default PaginationBar;