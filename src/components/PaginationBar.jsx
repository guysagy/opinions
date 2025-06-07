import Link from 'next/link';
import { ChevronLeftIcon , ChevronRightIcon } from '@heroicons/react/20/solid';

const PaginationBar = ({url, page, pageCount}) => {
    return (
        <div className="flex gap-2 pb-3">
            <PaginationLink href={`${url}?page=${page-1}`} enabled={page>1}>
                <ChevronLeftIcon className="h-5 w-5"/>
                <span className="sr-only">Previous page</span>
            </PaginationLink>
            <span>Page {page} of { pageCount }</span>
            <PaginationLink href={`${url}?page=${page+1}`} enabled={page<pageCount}>
                <ChevronRightIcon className="h-5 w-5"/>
                <span className="sr-only">Next page</span>
            </PaginationLink>
        </div>
    );
}

function PaginationLink({href, children, enabled}) {
    if (!enabled) {
        return (
            <span
                className="border cursor-not-allowed rounded text-slate-500 text-sm"
            >
                {children}
            </span>         
        );
    }

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