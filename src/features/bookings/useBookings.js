import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
    const [searchParams] = useSearchParams();

    // FILTER
    const filterValue = searchParams.get('status')
    const filter = !filterValue || filterValue === 'all'
        ? null
        : { field: 'status', value: filterValue };
    // : { field: 'totalPrice', value: 5000, method: 'gte' };

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ['bookings', filter], // like dependency array it will refetch when filter changes
        queryFn: () => getBookings({ filter })
    });

    return { isLoading, error, bookings };
}