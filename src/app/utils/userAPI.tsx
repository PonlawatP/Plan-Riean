export async function getPlanListData(token: string, signal: any) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    signal,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/plan`, requestOptions);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function createPlan(data: any, token: string, signal: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({
      ...data,
    }),
    signal,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/plan/create`, requestOptions);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getPlanData(plan_id: number, token: string, signal: any) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    signal,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/plan/view/${plan_id}`, requestOptions);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return {
      error: true,
      status: res.status,
    };
  }

  return res.json();
}
