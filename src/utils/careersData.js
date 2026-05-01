// Fetch and parse careers data from the static JSON file

export async function fetchCareersData() {
    try {
        const response = await fetch('./data/careers.json');
        if (!response.ok) throw new Error('Failed to load careers data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching careers data:', error);
        return { lastUpdated: null, listings: [] };
    }
}

export function getActiveListings(data) {
    return (data?.listings || []).filter(listing => listing.active === true);
}

export function filterByDepartment(listings, department) {
    if (department === 'All') return listings;
    return listings.filter(l => l.department === department);
}
