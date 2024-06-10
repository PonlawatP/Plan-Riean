export interface Ifilter {
  firstFilter: boolean;
  type: Array<string>;
  code: Array<string>;
  date: Array<string>;
  time: string;
}

export async function getData(year: number, semester: number, coursecode: string, filter: Ifilter, signal: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...filter,
    }),
    signal,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/${year}/${semester}/${coursecode}`,
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

export async function getSubjectDataByGroup(year: number, semester: number, signal: any) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/${year}/${semester}/group`, requestOptions);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getLecturerDataBySemaster(year: number, semester: number, signal: any) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/${year}/${semester}/lecturer`,
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

export async function getUpdatedData(signal: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
  };

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/updated/', requestOptions);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export function getCoursesByKey(data: any, courseKey: any) {
  for (const item of data) {
    for (const courseset of item.coursesets) {
      for (const child of courseset.children) {
        if (child.cr_key === courseKey) {
          return child;
        }
      }
    }
  }
  return null;
}
