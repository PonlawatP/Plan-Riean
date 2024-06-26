export async function getUniversityListData(signal: any) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal,
  };

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/university', requestOptions);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);

    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getUniversityData(uni_id: Number, major_group = false, signal: any) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal,
  };

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + '/university/' + uni_id + (major_group ? '?type=major_group' : ''),
    requestOptions,
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
export async function getUniversitySeasons(uni_id: Number, signal: any) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal,
  };

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/university/' + uni_id + '/season', requestOptions);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
